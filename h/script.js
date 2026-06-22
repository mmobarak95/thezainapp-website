/* Zain habit-invite landing — JS:
 *   1. Parse ?id=X&inviter=Y&mode=Z from the URL.
 *   2. Fetch public habit metadata from the BE (Habit/PublicInvitePreview).
 *   3. Hydrate the hero (emoji / name / inviter line) with the response,
 *      or fall back to generic copy on failure so the page never looks
 *      broken (the install CTA still works regardless).
 *   4. Wire the "Open in Zain" CTA: try the custom scheme `zainapp://h/?id=…`
 *      and fall back to the App Store after a 1.5s timeout if the app
 *      didn't intercept (visibility API used to detect the handoff).
 *
 * No build step. Vanilla ES5+ that runs on every browser shipped in the
 * last decade. The page is small enough that a framework would be silly.
 */

(function () {
  'use strict';

  var API_BASE = 'https://zain1-linux.azurewebsites.net/api';
  var APP_STORE_URL = 'https://apps.apple.com/app/id6757399804';
  // Must match `App/Utils/HabitShareCompose.js` INVITER_FALLBACK.
  var INVITER_FALLBACK = 'A friend';

  function $(id) { return document.getElementById(id); }

  function parseParams() {
    var qs = new URLSearchParams(window.location.search);
    var id = parseInt(qs.get('id'), 10);
    return {
      id: isFinite(id) && id > 0 ? id : null,
      inviter: qs.get('inviter') || null,
      mode: qs.get('mode') === 'challenge' ? 'challenge' : 'join',
    };
  }

  function renderCopy(habit, inviterName, mode) {
    var name = (habit && habit.name) || 'a habit on Zain';
    var emoji = (habit && habit.emoji) || '🌱';
    var who = inviterName || INVITER_FALLBACK;

    $('habit-emoji').textContent = emoji;
    $('habit-name').textContent = name;

    var eyebrow, fromLine;
    if (mode === 'challenge') {
      eyebrow = 'You’ve been challenged';
      fromLine = who + ' challenges you to a 1-on-1';
    } else {
      eyebrow = 'You’re invited to join';
      fromLine = who + ' invites you to join them';
    }
    $('invite-eyebrow').textContent = eyebrow;
    $('from-line').textContent = fromLine;

    document.title = 'Join ' + who + ' on Zain';
    document.body.classList.remove('is-loading');
  }

  function fetchPreview(habitId) {
    return fetch(API_BASE + '/Habit/PublicInvitePreview?habitId=' + encodeURIComponent(habitId), {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (payload) {
        // BE wraps in { success, data: { name, emoji, categoryId, inviterName } }
        if (payload && payload.success && payload.data) {
          return {
            name: payload.data.name || payload.data.Name,
            emoji: payload.data.emoji || payload.data.Emoji,
            inviterName: payload.data.inviterName || payload.data.InviterName,
          };
        }
        return null;
      })
      .catch(function () {
        return null;
      });
  }

  function buildOpenAppUrl(params) {
    // The app's iOS URL scheme is `zainapp://` (registered in Info.plist
    // as `com.itoasis.zainApp.oauth`). The path mirrors the universal-link
    // path so the parseDeepLink route map handles both identically.
    var qs = 'id=' + encodeURIComponent(params.id);
    if (params.inviter) qs += '&inviter=' + encodeURIComponent(params.inviter);
    if (params.mode) qs += '&mode=' + encodeURIComponent(params.mode);
    return 'zainapp://h/?' + qs;
  }

  function wireOpenInApp(params) {
    var openBtn = $('open-app');
    var fallback = APP_STORE_URL;
    openBtn.setAttribute('href', buildOpenAppUrl(params));

    openBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var schemeUrl = buildOpenAppUrl(params);

      // Use page visibility to detect whether the app actually intercepted:
      // when the OS handoff opens the app, this page goes hidden. If it's
      // still visible after 1.5s, the scheme didn't resolve — push the
      // user to the App Store so they can install it.
      var visible = !document.hidden;
      var onVis = function () { visible = !document.hidden; };
      document.addEventListener('visibilitychange', onVis);

      // Trigger the scheme. iOS will silently no-op if the app isn't
      // installed (no error dialog when triggered programmatically).
      window.location.href = schemeUrl;

      setTimeout(function () {
        document.removeEventListener('visibilitychange', onVis);
        if (visible) {
          window.location.href = fallback;
        }
      }, 1500);
    });
  }

  // ── Boot ─────────────────────────────────────────────
  document.body.classList.add('is-loading');

  var params = parseParams();
  wireOpenInApp(params);

  if (!params.id) {
    // Malformed link — bail to generic state. Install CTA still works.
    renderCopy(null, null, params.mode);
    return;
  }

  fetchPreview(params.id).then(function (data) {
    renderCopy(
      data,
      data && data.inviterName,
      params.mode,
    );
  });
})();
