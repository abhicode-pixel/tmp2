// THE PLACID MINDS - LEAD FUNNEL v2.2
// Brand-Aligned | Terracotta + Teal | Montserrat Font
// Premium Design | Simplified Form | 10-Digit Validation
// Therapist: Dhivyaraksha Pajni | Advanced Cognitive Hypnotic Psychotherapist
// v2.2 CHANGELOG:
//   - Redesigned minimized chat FAB: proper icon button (chat-bubble icon) w/ gradient,
//     soft attention ring pulse, unread badge — no more squashed "TPM" text circle
//   - Notification card redesigned + restacked directly ABOVE the chat FAB (same corner),
//     with avatar, title/subtitle, live dot, and a connecting pointer — like a linked pair
//   - Notification is now clickable and opens the chat widget directly
//   - Unread badge appears with the notification and clears automatically once chat opens
//   - Both chat + notification now consistently anchor bottom-left on desktop & mobile
//   - (carried over from v2.1) dvh-safe modal/chat sizing, true scroll-lock w/ position
//     restore, mobile-safe exit intent, converted-cookie suppression, iOS safe-area padding

(function () {
    // ─── INJECT STYLES FIRST (prevent FOUC) ───────────────────────────────────
    var style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Pacifico&display=swap');

        #tpm-system-v2 {
            --primary:       #D97A5C;
            --primary-dark:  #C0654A;
            --primary-light: #E8967E;
            --teal:          #044B50;
            --teal-light:    #0A6B72;
            --dark:          #1A2E2F;
            --gray:          #6B7280;
            --light-gray:    #F5F0ED;
            --border:        #E8DDD8;
            --bg:            #FDF9F7;
            --white:         #FFFFFF;
            --glass:         rgba(255, 255, 255, 0.85);
            font-family: 'Montserrat', sans-serif !important;
        }

        #tpm-system-v2 * { box-sizing: border-box !important; margin: 0; padding: 0; }

        /* True scroll-lock: preserves scroll position instead of snapping to top */
        body.tpm-no-scroll {
            position: fixed !important;
            width: 100% !important;
            overflow: hidden !important;
        }

        /* ── NOTIFICATION (now a linked card stacked above the chat FAB) ─────── */
        .tpm-notif {
            position: fixed !important; bottom: 112px !important; left: 30px !important;
            background: var(--white) !important; padding: 14px 18px 14px 14px !important;
            border-radius: 20px !important; box-shadow: 0 18px 45px rgba(4,75,80,0.2) !important;
            display: flex !important; align-items: center !important; gap: 12px !important;
            z-index: 999998 !important;
            animation: tpmSlideUp 0.55s cubic-bezier(0.23, 1, 0.32, 1) !important;
            max-width: 300px !important; cursor: pointer !important;
            border: 1px solid rgba(4,75,80,0.06) !important;
            transition: transform 0.25s ease, box-shadow 0.25s ease !important;
        }
        .tpm-notif:hover { transform: translateY(-3px) !important; box-shadow: 0 22px 55px rgba(4,75,80,0.26) !important; }
        /* Pointer connecting the card down toward the chat FAB */
        .tpm-notif::after {
            content: '' !important; position: absolute !important; bottom: -7px !important; left: 34px !important;
            width: 14px !important; height: 14px !important; background: var(--white) !important;
            transform: rotate(45deg) !important; border-radius: 3px !important;
            box-shadow: 4px 4px 8px rgba(4,75,80,0.06) !important;
        }
        .tpm-notif-avatar {
            width: 42px !important; height: 42px !important; border-radius: 50% !important; flex-shrink: 0 !important;
            background: linear-gradient(135deg, var(--teal), var(--teal-light)) !important;
            display: flex !important; align-items: center !important; justify-content: center !important;
            overflow: hidden !important; color: #fff !important; font-weight: 800 !important; font-size: 13px !important;
        }
        .tpm-notif-avatar img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
        .tpm-notif-text { flex: 1 !important; min-width: 0 !important; }
        .tpm-notif-title { font-size: 13px !important; font-weight: 700 !important; color: var(--dark) !important; line-height: 1.35 !important; }
        .tpm-notif-sub { font-size: 11px !important; color: var(--gray) !important; margin-top: 2px !important; font-weight: 500 !important; }
        .tpm-notif-dot {
            width: 10px !important; height: 10px !important; border-radius: 50% !important; background: #2ecc71 !important;
            flex-shrink: 0 !important; box-shadow: 0 0 0 4px rgba(46,204,113,0.15) !important;
            animation: tpmPulse 2s infinite !important;
        }

        /* ── OVERLAY ────────────────────────────────────────────────────────── */
        .tpm-overlay {
            position: fixed !important; inset: 0 !important;
            background: rgba(4, 75, 80, 0.3) !important; backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            z-index: 1000000 !important; display: flex !important;
            align-items: center !important; justify-content: center !important;
            animation: tpmFadeIn 0.4s ease !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            padding: 20px !important;
        }

        /* ── PREMIUM MODAL ──────────────────────────────────────────────────── */
        .tpm-modal {
            background: var(--glass) !important; width: 95% !important; max-width: 480px !important;
            border-radius: 32px !important; padding: 45px 40px !important; position: relative !important;
            box-shadow: 0 40px 100px rgba(4, 75, 80, 0.2) !important;
            border: 1px solid rgba(255, 255, 255, 0.4) !important;
            animation: tpmPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
            max-height: 92dvh !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            margin: auto !important;
            padding-bottom: calc(45px + env(safe-area-inset-bottom, 0px)) !important;
        }

        .tpm-close-btn {
            position: sticky !important; top: 0 !important; right: 0 !important;
            float: right !important;
            margin-top: -18px !important; margin-right: -18px !important; margin-bottom: -12px !important;
            width: 38px !important; height: 38px !important; border-radius: 50% !important;
            background: rgba(4, 75, 80, 0.06) !important; border: none !important; cursor: pointer !important;
            color: var(--teal) !important; font-size: 24px !important; z-index: 10 !important;
            display: flex !important; align-items: center !important; justify-content: center !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; line-height: 1 !important;
        }
        .tpm-close-btn:hover { background: var(--primary) !important; color: #fff !important; transform: rotate(90deg) scale(1.1) !important; }

        /* Modal Header */
        .tpm-modal-head { text-align: center; margin-bottom: 30px; clear: both; }
        .tpm-modal-logo {
            display: block; margin: 0 auto 16px; max-height: 55px; width: auto;
            object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05));
        }
        .tpm-modal-logo-fallback {
            display: inline-block; margin-bottom: 16px;
            font-family: 'Pacifico', cursive; font-size: 24px; color: var(--teal); letter-spacing: 1px;
        }
        .tpm-modal-head h2 {
            color: var(--teal); font-size: 24px; font-weight: 800; margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        .tpm-modal-head p { color: var(--gray); font-size: 14px; line-height: 1.6; font-weight: 400; }
        .tpm-trust-row {
            display: flex; align-items: center; justify-content: center; gap: 6px;
            margin-top: 10px; font-size: 12px; color: var(--primary-dark); font-weight: 700;
        }

        /* Form Fields */
        .tpm-form-stack { display: flex !important; flex-direction: column !important; gap: 20px !important; }
        .tpm-field { display: flex !important; flex-direction: column !important; position: relative; }
        .tpm-field label {
            display: block !important; font-size: 11px !important; font-weight: 700 !important;
            color: var(--teal) !important; text-transform: uppercase !important;
            margin-bottom: 8px !important; letter-spacing: 1px !important; text-align: left !important;
        }

        .tpm-field input, .tpm-field textarea {
            width: 100% !important; padding: 14px 18px !important;
            border: 1.5px solid var(--border) !important; border-radius: 16px !important;
            font-size: 14px !important; background: rgba(255, 255, 255, 0.6) !important;
            outline: none !important; transition: all 0.3s ease !important;
            font-family: inherit !important; color: var(--dark) !important;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.02) !important;
        }
        .tpm-field input:focus, .tpm-field textarea:focus {
            border-color: var(--primary) !important; background: #fff !important;
            box-shadow: 0 0 0 4px rgba(217,122,92,0.15), inset 0 2px 4px rgba(0,0,0,0.02) !important;
        }

        .tpm-field textarea { height: 100px !important; resize: none !important; }

        /* Validation tooltip */
        .tpm-error-hint {
            position: absolute; bottom: -18px; left: 2px; font-size: 10px; color: #dc2626;
            font-weight: 600; opacity: 0; transition: opacity 0.3s; pointer-events: none;
        }
        .tpm-field input:invalid:not(:placeholder-shown) + .tpm-error-hint { opacity: 1; }

        .tpm-submit {
            width: 100% !important; background: linear-gradient(135deg, var(--primary), var(--primary-light)) !important;
            color: #fff !important; border: none !important; padding: 18px !important;
            border-radius: 50px !important; font-size: 16px !important; font-weight: 800 !important;
            cursor: pointer !important; margin-top: 10px !important; letter-spacing: 0.5px !important;
            box-shadow: 0 12px 30px rgba(217,122,92,0.4) !important; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            text-transform: uppercase;
            display: flex !important; align-items: center !important; justify-content: center !important; gap: 10px !important;
        }
        .tpm-submit:hover:not(:disabled) { transform: translateY(-4px) scale(1.02) !important; box-shadow: 0 20px 45px rgba(217,122,92,0.5) !important; }
        .tpm-submit:active:not(:disabled) { transform: translateY(-1px) !important; }
        .tpm-submit:disabled { opacity: 0.85 !important; cursor: not-allowed !important; }

        .tpm-spinner {
            width: 16px; height: 16px; border-radius: 50%;
            border: 2.5px solid rgba(255,255,255,0.4); border-top-color: #fff;
            animation: tpmSpin 0.7s linear infinite; display: inline-block;
        }

        .tpm-privacy {
            text-align: center; font-size: 12px; color: var(--gray); margin-top: 20px;
            display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .tpm-privacy span { color: var(--teal); font-weight: 700; opacity: 0.8; }

        /* ── CHAT WIDGET 2.0 ────────────────────────────────────────────────── */
        .tpm-chat {
            position: fixed !important; bottom: 30px !important; left: 30px !important;
            width: 380px !important; background: var(--white) !important; border-radius: 28px !important;
            z-index: 1000001 !important; box-shadow: 0 15px 50px rgba(4,75,80,0.2) !important;
            overflow: hidden !important; display: flex !important; flex-direction: column !important;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
            border: 1px solid rgba(4,75,80,0.05) !important;
            max-height: 80dvh !important;
        }

        /* ── Minimized state: real FAB icon button, not a squashed header ────── */
        .tpm-chat.tpm-minimized {
            width: 64px !important; height: 64px !important; border-radius: 50% !important;
            background: linear-gradient(135deg, var(--teal), var(--teal-light)) !important;
            box-shadow: 0 12px 32px rgba(4,75,80,0.38), 0 3px 10px rgba(0,0,0,0.12) !important;
            border: none !important; cursor: pointer !important;
        }
        .tpm-chat.tpm-minimized:hover { transform: translateY(-4px) scale(1.06) !important; box-shadow: 0 18px 42px rgba(4,75,80,0.45) !important; }
        /* Soft attention ring pulse to draw the eye, matches primary accent */
        .tpm-chat.tpm-minimized::before {
            content: '' !important; position: absolute !important; inset: -6px !important; border-radius: 50% !important;
            border: 2px solid rgba(217,122,92,0.55) !important; pointer-events: none !important;
            animation: tpmRing 2.4s ease-out infinite !important;
        }
        .tpm-chat.tpm-minimized .tpm-chat-header {
            background: transparent !important; padding: 0 !important; width: 100% !important; height: 100% !important;
            justify-content: center !important; cursor: pointer !important;
        }
        .tpm-chat.tpm-minimized .tpm-chat-info,
        .tpm-chat.tpm-minimized .tpm-chat-close { display: none !important; }
        .tpm-chat.tpm-minimized .tpm-avatar {
            width: 64px !important; height: 64px !important; background: transparent !important;
        }
        .tpm-chat.tpm-minimized .tpm-avatar-text { display: none !important; }
        .tpm-chat.tpm-minimized .tpm-fab-icon { display: flex !important; }
        .tpm-chat.tpm-minimized .tpm-online-dot { bottom: 2px !important; right: 2px !important; }
        /* Unread badge — appears alongside the notification, clears when opened */
        .tpm-fab-badge {
            display: none !important; position: absolute !important; top: -4px !important; right: -4px !important;
            width: 22px !important; height: 22px !important; border-radius: 50% !important;
            background: var(--primary) !important; color: #fff !important; font-size: 11px !important;
            font-weight: 800 !important; align-items: center !important; justify-content: center !important;
            border: 2.5px solid #fff !important; box-shadow: 0 3px 8px rgba(217,122,92,0.5) !important;
        }
        .tpm-chat.tpm-minimized.tpm-has-badge .tpm-fab-badge { display: flex !important; }

        .tpm-chat-header {
            background: linear-gradient(135deg, var(--teal), var(--teal-light)) !important;
            padding: 18px 22px !important; color: #fff !important;
            display: flex !important; justify-content: space-between !important;
            align-items: center !important; cursor: pointer !important;
            flex-shrink: 0 !important;
        }
        .tpm-avatar {
            position: relative !important; width: 46px !important; height: 46px !important;
            background: rgba(255,255,255,0.15) !important; border-radius: 50% !important;
            display: flex !important; align-items: center !important; justify-content: center !important;
            transition: 0.3s;
        }
        .tpm-avatar-text { font-size: 14px; font-weight: 800; color: #fff; }
        .tpm-fab-icon {
            display: none !important; width: 26px !important; height: 26px !important; color: #fff !important;
        }
        .tpm-online-dot {
            position: absolute !important; bottom: 2px !important; right: 2px !important;
            width: 12px !important; height: 12px !important; background: #2ecc71 !important;
            border: 2px solid #fff !important; border-radius: 50% !important;
            animation: tpmPulse 2s infinite !important;
        }

        .tpm-messages {
            height: min(320px, 45dvh) !important; padding: 22px !important; overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            background: #fdfdfd !important; display: flex !important; flex-direction: column !important;
            gap: 12px !important; scroll-behavior: smooth;
        }
        .tpm-msg {
            padding: 13px 18px !important; border-radius: 22px !important; font-size: 14px !important;
            line-height: 1.6 !important; animation: tpmFadeUp 0.4s ease !important;
            max-width: 85% !important; font-weight: 400;
        }
        .tpm-bot { background: #f1f5f9 !important; border-bottom-left-radius: 4px !important; color: var(--dark) !important; }
        .tpm-user { background: var(--primary) !important; color: #fff !important; align-self: flex-end !important; border-bottom-right-radius: 4px !important; }
        .tpm-option {
            display: inline-block !important; margin: 8px 6px 0 0 !important;
            background: #fff !important; border: 1.5px solid var(--border) !important;
            color: var(--teal) !important; padding: 8px 14px !important; border-radius: 20px !important;
            font-size: 12px !important; font-weight: 700 !important; cursor: pointer !important;
            transition: all 0.25s ease !important;
        }
        .tpm-option:hover { background: var(--primary) !important; border-color: var(--primary) !important; color: #fff !important; }

        .tpm-chat-footer {
            padding: 18px 20px !important; background: #fff !important;
            border-top: 1px solid #f1f5f9 !important; display: flex !important; gap: 12px !important;
            flex-shrink: 0 !important;
            padding-bottom: calc(18px + env(safe-area-inset-bottom, 0px)) !important;
        }

        /* ── EXIT INTENT REDESIGN (THE GIFT CARD) ─────────────────────────── */
        .tpm-quiz {
            background: linear-gradient(to bottom right, #fff, #fdf9f7) !important;
            width: 95% !important; max-width: 440px !important; border-radius: 35px !important;
            padding: 50px 40px !important; text-align: center !important; position: relative !important;
            box-shadow: 0 50px 120px rgba(4, 75, 80, 0.3) !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            max-height: 92dvh !important;
            margin: auto !important;
            padding-bottom: calc(50px + env(safe-area-inset-bottom, 0px)) !important;
        }
        .tpm-quiz::before {
            content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 8px;
            background: linear-gradient(to right, var(--teal), var(--primary));
        }

        .tpm-quiz-badge {
            display: inline-block; background: rgba(217,122,92,0.1); color: var(--primary);
            padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 800;
            text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;
        }
        .tpm-quiz-icon { font-size: 50px; margin-bottom: 20px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1)); }

        .tpm-choices { display: flex; flex-direction: column; gap: 12px; }
        .tpm-choices button {
            background: white; border: 2px solid #f1f5f9; padding: 15px 20px;
            border-radius: 18px; font-weight: 600; color: var(--dark);
            transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-align: left;
            display: flex; align-items: center; gap: 14px; font-size: 14px;
        }
        .tpm-choices button:hover { border-color: var(--primary); color: var(--primary); transform: translateX(8px); background: #fdf9f7; }

        /* ── ANIMATIONS ───────────────────────────────────────────────────────── */
        @keyframes tpmSlideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes tpmFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tpmFadeUp  { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes tpmPopIn   {
            0% { transform: scale(0.85); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes tpmPulse   { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.8); opacity: 0.6; } }
        @keyframes tpmSpin    { to { transform: rotate(360deg); } }
        @keyframes tpmRing    { 0% { transform: scale(0.85); opacity: 0.85; } 100% { transform: scale(1.35); opacity: 0; } }

        /* ── RESPONSIVE ──────────────────────────────────────────────────────── */
        @media (max-width: 768px) {
            .tpm-overlay { padding: 14px !important; align-items: center !important; }
            .tpm-modal { padding: 30px 22px !important; padding-bottom: calc(30px + env(safe-area-inset-bottom, 0px)) !important; border-radius: 24px !important; max-height: 94dvh !important; }
            .tpm-modal-head { margin-bottom: 22px !important; }
            .tpm-modal-logo { max-height: 42px !important; margin-bottom: 12px !important; }
            .tpm-modal-head h2 { font-size: 20px !important; }
            .tpm-form-stack { gap: 16px !important; }
            .tpm-field textarea { height: 76px !important; }
            .tpm-quiz { padding: 32px 22px !important; padding-bottom: calc(32px + env(safe-area-inset-bottom, 0px)) !important; border-radius: 26px !important; }
            .tpm-quiz-icon { font-size: 38px !important; margin-bottom: 12px !important; }
            .tpm-chat { width: calc(100% - 32px) !important; left: 16px !important; right: 16px !important; bottom: 16px !important; }
            .tpm-chat.tpm-minimized { width: 60px !important; height: 60px !important; left: 16px !important; right: auto !important; bottom: 16px !important; }
            .tpm-chat.tpm-minimized .tpm-avatar { width: 60px !important; height: 60px !important; }
            .tpm-chat.tpm-minimized .tpm-fab-icon { width: 22px !important; height: 22px !important; }
            .tpm-messages { height: min(280px, 40dvh) !important; padding: 16px !important; }
            .tpm-notif { left: 16px !important; bottom: 92px !important; max-width: 250px !important; padding: 12px 14px 12px 12px !important; gap: 10px !important; }
            .tpm-notif::after { left: 26px !important; }
            .tpm-notif-avatar { width: 36px !important; height: 36px !important; }
            .tpm-notif-title { font-size: 12px !important; }
            .tpm-notif-sub { font-size: 10px !important; }
        }

        /* Short-viewport (landscape phones, keyboard open) */
        @media (max-height: 700px) {
            .tpm-modal { padding-top: 22px !important; }
            .tpm-modal-logo { max-height: 34px !important; margin-bottom: 8px !important; }
            .tpm-modal-head { margin-bottom: 14px !important; }
            .tpm-modal-head p { display: none !important; }
            .tpm-field textarea { height: 56px !important; }
            .tpm-form-stack { gap: 12px !important; }
            .tpm-quiz-icon { font-size: 30px !important; margin-bottom: 8px !important; }
            .tpm-messages { height: min(220px, 34dvh) !important; }
        }

        .tpm-off { display: none !important; opacity: 0 !important; visibility: hidden !important; }
    `;
    document.head.appendChild(style);

    // ─── HTML STRUCTURE ─────────────────────────────────────────────────────────
    var container = document.createElement('div');
    container.id = 'tpm-system-v2';
    container.innerHTML = `

    <!-- NOTIFICATION (linked card, stacked above the chat FAB) -->
    <div id="tpm-notif" class="tpm-notif tpm-off" style="display:none;" onclick="tpmToggleChat()">
        <div class="tpm-notif-avatar">
            <img
                src="https://static.wixstatic.com/media/ba043e_bf38d7d4c0624838b6d8b1f5c6e8e6e6~mv2.png"
                alt=""
                onerror="this.style.display='none'; this.parentElement.textContent='TPM';"
            >
        </div>
        <div class="tpm-notif-text">
            <div class="tpm-notif-title">🌿 New session booked just now</div>
            <div class="tpm-notif-sub">The Placid Minds</div>
        </div>
        <span class="tpm-notif-dot"></span>
    </div>

    <!-- MAIN MODAL OVERLAY -->
    <div id="tpm-overlay" class="tpm-overlay tpm-off" style="display:none;">
        <div class="tpm-modal">
            <button class="tpm-close-btn" onclick="tpmClose()" title="Close">&times;</button>

            <div class="tpm-modal-head">
                <img
                    src="https://static.wixstatic.com/media/ba043e_bf38d7d4c0624838b6d8b1f5c6e8e6e6~mv2.png"
                    alt="The Placid Minds"
                    class="tpm-modal-logo"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';"
                >
                <span class="tpm-modal-logo-fallback" style="display:none;">The Placid Minds</span>
                <h2>Begin Your Journey</h2>
                <p>Private session with Dhivyaraksha Pajni — Cognitive Hypnotic Psychotherapist</p>
                <div class="tpm-trust-row">⭐⭐⭐⭐⭐ <span>Trusted by 500+ clients</span></div>
            </div>

            <form id="tpm-form" onsubmit="tpmSubmit(event)">
                <input type="hidden" name="access_key" value="1ab94b2f-08e0-47a6-8aec-c91a0b8d48ea">
                <input type="hidden" name="subject" value="New Inquiry – The Placid Minds">

                <div class="tpm-form-stack">
                    <div class="tpm-field">
                        <label>FULL NAME</label>
                        <input type="text" name="name" required placeholder="How should we address you?">
                    </div>

                    <div class="tpm-field">
                        <label>WHATSAPP NUMBER (10 DIGITS)</label>
                        <input type="tel" name="phone" required placeholder="e.g. 981889XXXX" pattern="[0-9]{10}" inputmode="numeric" maxlength="10" title="Please enter a valid 10-digit mobile number">
                        <span class="tpm-error-hint">Exactly 10 digits required</span>
                    </div>

                    <div class="tpm-field">
                        <label>HOW CAN WE HELP?</label>
                        <textarea name="message" required placeholder="Briefly describe what's on your mind..."></textarea>
                    </div>

                    <button type="submit" class="tpm-submit"><span class="tpm-submit-label">Confirm Discovery Session</span></button>
                </div>
                <div id="tpm-form-msg"></div>
            </form>
            <p class="tpm-privacy">🔒 <span>Confidentiality Guaranteed.</span> Your data is 100% private.</p>
        </div>
    </div>

    <!-- CHAT WIDGET -->
    <div id="tpm-chat" class="tpm-chat tpm-minimized">
        <div class="tpm-chat-header" onclick="tpmToggleChat()">
            <div class="tpm-chat-agent" style="display:flex; align-items:center;">
                <div class="tpm-avatar">
                   <span class="tpm-avatar-text">TPM</span>
                   <svg class="tpm-fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                       <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                   </svg>
                   <span class="tpm-online-dot"></span>
                </div>
                <div class="tpm-chat-info" style="margin-left:12px;">
                    <strong style="display:block; font-size:15px;">Mindset Strategist</strong>
                    <span style="font-size:11px; opacity:0.8;">Online • Replies instantly</span>
                </div>
            </div>
            <button class="tpm-chat-close" style="background:transparent; border:none; color:#fff; font-size:26px; cursor:pointer;" onclick="event.stopPropagation(); tpmCloseChat()">&times;</button>
        </div>
        <div id="tpm-messages" class="tpm-messages"></div>
        <div class="tpm-chat-footer">
            <input type="text" id="tpm-input" placeholder="Type a message..." disabled
                   style="flex:1; border:1.5px solid #f1f5f9; padding:12px 18px; border-radius:15px; outline:none; font-family:inherit;">
            <button id="tpm-send" onclick="tpmSend()" disabled
                    style="width:48px; height:48px; background:var(--primary); border:none; border-radius:12px; color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
            </button>
        </div>
        <span class="tpm-fab-badge">1</span>
    </div>

    <!-- EXIT INTENT REDESIGNED -->
    <div id="tpm-exit" class="tpm-overlay tpm-off" style="display:none;">
        <div class="tpm-quiz">
            <button class="tpm-close-btn" onclick="tpmCloseExit()">&times;</button>
            <div class="tpm-quiz-badge">Personalized Support</div>

            <div id="tpm-exit-step1">
                <div class="tpm-quiz-icon">🌿</div>
                <h3>Let's find the right path.</h3>
                <p>What's the primary area you'd like to work on? This helps us prepare for our session.</p>
                <div class="tpm-choices">
                    <button onclick="tpmExitNext('Anxiety & Stress')"><span>😰</span> Anxiety & Stress</button>
                    <button onclick="tpmExitNext('Depression')"><span>💭</span> Depression / Low Mood</button>
                    <button onclick="tpmExitNext('Relationships')"><span>💔</span> Relationship Dynamics</button>
                    <button onclick="tpmExitNext('Career & Success')"><span>🚀</span> Career & Personal Growth</button>
                </div>
            </div>

            <div id="tpm-exit-step2" style="display:none;">
                <div class="tpm-quiz-badge">Almost Done</div>
                <div class="tpm-quiz-icon">🤝</div>
                <h3>Let's Connect</h3>
                <p>Dhivyaraksha will reach out to schedule your Discovery Session. Please provide your direct WhatsApp below.</p>
                <form onsubmit="tpmExitSubmit(event)">
                    <input type="hidden" name="access_key" value="1ab94b2f-08e0-47a6-8aec-c91a0b8d48ea">
                    <input type="hidden" id="tpm-exit-topic-hidden" name="message" value="">

                    <div style="text-align:left; margin-bottom:15px;">
                        <label style="font-size:10px; font-weight:700; color:var(--teal); text-transform:uppercase; display:block; margin-bottom:6px;">Your WhatsApp (10 Digits)</label>
                        <input type="tel" id="tpm-exit-phone" name="phone" required placeholder="Enter 10-digit mobile"
                               pattern="[0-9]{10}" inputmode="numeric" maxlength="10"
                               style="width:100%; padding:14px; border:1.5px solid var(--border); border-radius:14px; outline:none;"
                               oninput="this.setCustomValidity('')" oninvalid="this.setCustomValidity('Please enter exactly 10 digits')">
                    </div>

                    <button type="submit" class="tpm-submit"><span class="tpm-submit-label">Connect via WhatsApp</span></button>
                    <div id="tpm-exit-msg"></div>
                </form>
            </div>
        </div>
    </div>
    `;
    document.body.appendChild(container);

    // ─── LOGIC & STATE ──────────────────────────────────────────────────────────
    var tpmState = { phase: 0, step: 0, data: {}, scrollY: 0 };
    var TPM_SEEN_COOKIE = 'tpm_v2_status';
    var TPM_CONVERTED_COOKIE = 'tpm_v2_converted';

    function setCookie(n, v, hours) {
        var d = new Date();
        d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
        document.cookie = n + '=' + v + ';expires=' + d.toUTCString() + ';path=/';
    }
    function getCookie(n) {
        var m = document.cookie.match(new RegExp('(^| )' + n + '=([^;]+)'));
        return m ? m[2] : null;
    }
    function hasConverted() { return !!getCookie(TPM_CONVERTED_COOKIE); }

    // ─── SCROLL LOCK (fixes mobile "shrinking viewport" bug) ───────────────────
    function tpmLockScroll() {
        tpmState.scrollY = window.scrollY || window.pageYOffset || 0;
        document.body.style.top = (-tpmState.scrollY) + 'px';
        document.body.classList.add('tpm-no-scroll');
    }
    function tpmUnlockScroll() {
        document.body.classList.remove('tpm-no-scroll');
        document.body.style.top = '';
        window.scrollTo(0, tpmState.scrollY || 0);
    }

    // ─── INITIALIZATION ─────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        if (hasConverted()) return; // don't bother returning leads with any popups

        // Notification trigger — also lights up the unread badge on the FAB
        setTimeout(function () {
            var notif = document.getElementById('tpm-notif');
            var chat = document.getElementById('tpm-chat');
            if (notif) {
                notif.style.display = 'flex';
                notif.classList.remove('tpm-off');
                if (chat && chat.classList.contains('tpm-minimized')) {
                    chat.classList.add('tpm-has-badge');
                }
                setTimeout(function () {
                    notif.classList.add('tpm-off');
                    setTimeout(function () { notif.style.display = 'none'; }, 600);
                }, 7000);
            }
        }, 3000);

        // Scroll trigger (30%)
        if (!getCookie(TPM_SEEN_COOKIE)) {
            window.addEventListener('scroll', tpmScrollTrigger, { passive: true });
        }

        // Mobile-friendly exit intent (mouseleave doesn't fire on touch devices)
        var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) {
            // 1) Fires when user backgrounds the tab / switches apps
            document.addEventListener('visibilitychange', function () {
                if (document.visibilityState === 'hidden') tpmMaybeShowExit();
            });
            // 2) Fires on a fast upward scroll flick near the top (common "leaving" gesture on mobile)
            var lastY = window.scrollY, lastT = Date.now();
            window.addEventListener('scroll', function () {
                var y = window.scrollY, t = Date.now();
                var dt = t - lastT;
                if (dt > 0) {
                    var v = (lastY - y) / dt; // px/ms, positive = scrolling up
                    if (v > 1.2 && y < 400) tpmMaybeShowExit();
                }
                lastY = y; lastT = t;
            }, { passive: true });
        } else {
            document.addEventListener('mouseleave', function (e) {
                if (e.clientY < 0) tpmMaybeShowExit();
            });
        }
    });

    function tpmScrollTrigger() {
        if (tpmState.phase > 0) return;
        var h = document.documentElement, b = document.body;
        var sH = Math.max(h.scrollHeight, b.scrollHeight, h.offsetHeight, b.offsetHeight);
        var cH = h.clientHeight;
        if (sH <= cH + 100) return;
        var pct = (h.scrollTop || b.scrollTop) / (sH - cH) * 100;
        if (pct > 30) {
            tpmState.phase = 1;
            var ov = document.getElementById('tpm-overlay');
            ov.style.display = 'flex';
            ov.classList.remove('tpm-off');
            tpmLockScroll();
            setCookie(TPM_SEEN_COOKIE, 'seen', 72);
        }
    }

    // ─── MODAL CONTROLS ─────────────────────────────────────────────────────────
    window.tpmClose = function () {
        var ov = document.getElementById('tpm-overlay');
        ov.classList.add('tpm-off');
        setTimeout(function () { ov.style.display = 'none'; }, 400);
        tpmUnlockScroll();
        if (tpmState.phase === 1) {
            tpmState.phase = 2;
            setTimeout(tpmToggleChat, 4000);
        }
    };

    window.tpmSubmit = function (e) {
        e.preventDefault();
        var btn = e.target.querySelector('button[type="submit"]');
        if (btn.disabled) return; // hard guard against double submit
        var label = btn.querySelector('.tpm-submit-label');
        var msg = document.getElementById('tpm-form-msg');

        // Final length check for phone
        var phone = e.target.phone.value;
        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter exactly 10 digits for the WhatsApp number.");
            return;
        }

        btn.disabled = true;
        label.innerHTML = '<span class="tpm-spinner"></span> Connecting...';

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: new FormData(e.target)
        })
        .then(r => r.json())
        .then(res => {
            if (res.success) {
                msg.innerHTML = '<div style="color:#10b981; margin-top:15px; font-weight:700; font-size:14px; text-align:center;">✨ Confirmed! Dhivyaraksha will connect with you shortly.</div>';
                setCookie(TPM_CONVERTED_COOKIE, '1', 24 * 90);
                setTimeout(tpmClose, 3000);
            } else {
                msg.innerHTML = '<div style="color:#ef4444; margin-top:10px; font-size:13px; text-align:center;">Submission error. Please try again.</div>';
                label.innerText = 'Confirm Discovery Session';
                btn.disabled = false;
            }
        })
        .catch(() => {
            msg.innerHTML = '<div style="color:#ef4444; margin-top:10px; font-size:13px; text-align:center;">Network issue. Check connection.</div>';
            label.innerText = 'Confirm Discovery Session';
            btn.disabled = false;
        });
    };

    // ─── CHAT WIDGET CONTROLS ───────────────────────────────────────────────────
    window.tpmToggleChat = function () {
        var chat = document.getElementById('tpm-chat');
        if (chat.classList.contains('tpm-minimized')) {
            chat.classList.remove('tpm-minimized');
            chat.classList.remove('tpm-has-badge'); // clear unread badge once opened

            // Also dismiss the notification card right away if it's still showing
            var notif = document.getElementById('tpm-notif');
            if (notif && !notif.classList.contains('tpm-off')) {
                notif.classList.add('tpm-off');
                setTimeout(function () { notif.style.display = 'none'; }, 400);
            }

            if (tpmState.step === 0) {
                setTimeout(() => {
                    tpmBotMsg("Hi there! 🌿 I'm the Placid Minds assistant.");
                    setTimeout(() => {
                        tpmBotMsg("Would you like to start a professional mindset transformation today?"
                            + '<div><button class="tpm-option" onclick="tpmChatStart(\'Mindset Overhaul\')">🚀 Yes, let\'s start</button>'
                            + '<button class="tpm-option" onclick="tpmChatStart(\'Learn More\')">💡 Tell me more first</button></div>'
                        );
                    }, 1000);
                }, 500);
            }
        }
    };

    window.tpmCloseChat = function () {
        document.getElementById('tpm-chat').classList.add('tpm-minimized');
    };

    function tpmBotMsg(html) {
        var d = document.createElement('div');
        d.className = 'tpm-msg tpm-bot';
        d.innerHTML = html;
        var box = document.getElementById('tpm-messages');
        box.appendChild(d);
        box.scrollTop = box.scrollHeight;
    }

    function tpmUserMsg(text) {
        var d = document.createElement('div');
        d.className = 'tpm-msg tpm-user';
        d.innerText = text;
        var box = document.getElementById('tpm-messages');
        box.appendChild(d);
        box.scrollTop = box.scrollHeight;
    }

    window.tpmChatStart = function (intent) {
        tpmUserMsg(intent);
        tpmState.step = 1;
        tpmState.data.intent = intent;
        setTimeout(() => {
            tpmBotMsg("I'd love to help with that. What is your <strong>Full Name</strong>?");
            var inp = document.getElementById('tpm-input');
            var btn = document.getElementById('tpm-send');
            inp.disabled = false;
            btn.disabled = false;
            inp.focus();
        }, 800);
    };

    window.tpmSend = function () {
        var inp = document.getElementById('tpm-input');
        var val = inp.value.trim();
        if (!val) return;
        tpmUserMsg(val);
        inp.value = '';

        if (tpmState.step === 1) {
            tpmState.data.name = val;
            tpmState.step = 2;
            setTimeout(() => tpmBotMsg("Great, <strong>" + val + "</strong>. Now, what's your 10-digit <strong>WhatsApp number</strong>?"), 800);
        } else if (tpmState.step === 2) {
            if (!/^[0-9]{10}$/.test(val)) {
                tpmBotMsg("⚠️ Please enter exactly 10 digits for your phone number.");
                return;
            }
            tpmState.data.phone = val;
            tpmState.step = 3; // lock further sends until this round-trip resolves
            document.getElementById('tpm-send').disabled = true;
            document.getElementById('tpm-input').disabled = true;
            tpmBotMsg("Processing... ⏳");

            var fd = new FormData();
            fd.append('access_key', '1ab94b2f-08e0-47a6-8aec-c91a0b8d48ea');
            fd.append('name', tpmState.data.name);
            fd.append('phone', tpmState.data.phone);
            fd.append('message', 'Chat Interest: ' + tpmState.data.intent);
            fd.append('subject', 'Chat Lead – The Placid Minds');

            fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
                .then(() => {
                    tpmBotMsg("✅ Successfully connected! Dhivyaraksha will reach out on WhatsApp shortly. Have a peaceful day 🌿");
                    setCookie(TPM_CONVERTED_COOKIE, '1', 24 * 90);
                    setTimeout(tpmCloseChat, 6000);
                })
                .catch(() => {
                    tpmBotMsg("⚠️ Something went wrong sending that. Please try again in a moment.");
                    tpmState.step = 2;
                    document.getElementById('tpm-send').disabled = false;
                    document.getElementById('tpm-input').disabled = false;
                });
        }
    };

    // ─── EXIT INTENT CONTROLS ───────────────────────────────────────────────────
    var exitShown = false;
    function tpmMaybeShowExit() {
        if (exitShown || tpmState.phase === 0 || hasConverted()) return;
        exitShown = true;
        var ex = document.getElementById('tpm-exit');
        ex.style.display = 'flex';
        ex.classList.remove('tpm-off');
        tpmLockScroll();
    }

    window.tpmExitNext = function (topic) {
        document.getElementById('tpm-exit-topic-hidden').value = "Exit Lead Interest: " + topic;
        document.getElementById('tpm-exit-step1').style.display = 'none';
        document.getElementById('tpm-exit-step2').style.display = 'block';
    };

    window.tpmCloseExit = function () {
        var ex = document.getElementById('tpm-exit');
        ex.classList.add('tpm-off');
        setTimeout(function () { ex.style.display = 'none'; }, 400);
        tpmUnlockScroll();
    };

    window.tpmExitSubmit = function (e) {
        e.preventDefault();
        var btn = e.target.querySelector('button[type="submit"]');
        if (btn.disabled) return;
        var label = btn.querySelector('.tpm-submit-label');
        var phone = document.getElementById('tpm-exit-phone').value;
        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Exactly 10 digits required.");
            return;
        }

        var msg = document.getElementById('tpm-exit-msg');
        btn.disabled = true;
        label.innerHTML = '<span class="tpm-spinner"></span> Connecting...';

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: new FormData(e.target)
        })
        .then(() => {
            msg.innerHTML = '<div style="color:#10b981; margin-top:20px; font-weight:700;">✅ Success! Talk to you soon.</div>';
            setCookie(TPM_CONVERTED_COOKIE, '1', 24 * 90);
            setTimeout(tpmCloseExit, 3000);
        })
        .catch(() => {
            msg.innerHTML = '<div style="color:#ef4444; margin-top:10px; font-size:13px;">Network issue. Please try again.</div>';
            label.innerText = 'Connect via WhatsApp';
            btn.disabled = false;
        });
    };

    // Accessibility: ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            tpmClose();
            tpmCloseExit();
            tpmCloseChat();
        }
    });

})();
