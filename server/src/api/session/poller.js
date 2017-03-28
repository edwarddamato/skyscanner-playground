const maxRetries = 3;
const pollDelay = 1000;
const maxPollTime = 15 * 2000;

const pollingManager = (request, state) => ({
  start: () => {
    return new Promise((resolve, reject) => {
      state.onFinished = resolve;
      state.onError = reject;

      // before polling, allow 1.5s as specified in API documentation
      setTimeout(() => {
        // overall timeout - don't wait too long for complete results
        setTimeout(() => {
          state.timedOut = true;
        }, maxPollTime);

        pollingManager(request, state).poll();
      }, pollDelay * 1.5);
    });
  },

  poll: () => {
    if (state.finished) {
      return;
    }

    // auto-repoll if nothing happens for a while
    const backupTimer = setTimeout(() => {
      pollingManager(request, state).repoll();
    }, pollDelay * 3);

    request()
      .then(response => {
        clearTimeout(backupTimer);
        switch (response.status) {
          case 200:
            response.json().then(data => {
              pollingManager(request, state).success(data);
            });
            break;
          case 304:
            pollingManager(request, state).success(state.data);
            break;
          default:
            throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
      .catch(err => {
        pollingManager(request, state).error(err);
      });
  },

  repoll: () => {
    pollingManager(request, state).poll();
  },

  success: data => {
    state.data = data;
    if (state.finished) {
      return;
    }
    if (data.Status === 'UpdatesComplete' || state.timedOut) {
      state.finished = true;
      return state.onFinished(data);
    }
    pollingManager(request, state).repoll();
  },

  // Not implemented: error handling by response code
  error: err => {
    state.tries++;
    if (!state.timedOut && state.tries < maxRetries) {
      console.log('retrying');
      return pollingManager(request, state).repoll();
    }
    state.onError(err);
  }
});

const poller = request => {
  const state = {
    data: {},
    finished: false,
    timedOut: false,
    tries: 0
  };

  return Object.assign(
    {},
    {
      begin: () => {
        return pollingManager(request, state).start();
      }
    }
  );
};

export default poller;
