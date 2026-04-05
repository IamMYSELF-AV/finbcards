// Simple auth guard to prevent unauthenticated dashboard access.
// If /api/auth/me fails, clear cached client state and return to login.
(function () {
  try {
    var path = window.location.pathname || "/";
    fetch("/api/auth/me", { credentials: "include" })
      .then(function (res) {
        if (res.ok) {
          return;
        }
        try {
          localStorage.clear();
          sessionStorage.clear();
        } catch (_) {
          // Ignore storage errors
        }
        if (path !== "/") {
          window.location.replace("/");
        }
      })
      .catch(function () {
        // Network or function error: be safe and force login.
        try {
          localStorage.clear();
          sessionStorage.clear();
        } catch (_) {
          // Ignore storage errors
        }
        if (path !== "/") {
          window.location.replace("/");
        }
      });
  } catch (_) {
    // Fail closed: do nothing if guard itself errors.
  }
})();
