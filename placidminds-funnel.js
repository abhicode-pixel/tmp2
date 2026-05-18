// THE PLACID MINDS - LEAD FUNNEL v2.0
// Brand-Aligned | Terracotta + Teal | Montserrat Font
// Premium Design | Simplified Form | 10-Digit Validation
// Therapist: Dhivyaraksha Pajni | Advanced Cognitive Hypnotic Psychotherapist

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

        body.tpm-no-scroll { overflow: hidden !important; position: fixed !important; width: 100% !important; }

        /* ── NOTIFICATION ───────────────────────────────────────────────────── */
        .tpm-notif {
            position: fixed !important; bottom: 30px !important; right: 30px !important;
            background: var(--white) !important; padding: 16px 24px !important;
            border-radius: 60px !important; box-shadow: 0 10px 40px rgba(4,75,80,0.15) !important;
            display: flex !important; align-items: center !important; gap: 14px !important;
            z-index: 999998 !important; border-left: 5px solid var(--primary) !important;
            animation: tpmSlideIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) !important; max-width: 350px !important;
        }
        .tpm-live-badge {
            background: var(--primary); color: #fff; font-size: 9px; font-weight: 800;
            padding: 4px 10px; border-radius: 6px; letter-spacing: 0.8px; white-space: nowrap;
            text-transform: uppercase;
        }
        .tpm-notif p { font-size: 13px; color: var(--dark); line-height: 1.4; font-weight: 500; }

        /* ── OVERLAY ────────────────────────────────────────────────────────── */
        .tpm-overlay {
            position: fixed !important; inset: 0 !important;
            background: rgba(4, 75, 80, 0.3) !important; backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            z-index: 1000000 !important; display: flex !important;
            align-items: center !important; justify-content: center !important;
            animation: tpmFadeIn 0.4s ease !important; overflow-y: auto !important; padding: 20px !important;
        }

        /* ── PREMIUM MODAL ──────────────────────────────────────────────────── */
        .tpm-modal {
            background: var(--glass) !important; width: 95% !important; max-width: 480px !important;
            border-radius: 32px !important; padding: 45px 40px !important; position: relative !important;
            box-shadow: 0 40px 100px rgba(4, 75, 80, 0.2) !important;
            border: 1px solid rgba(255, 255, 255, 0.4) !important;
            animation: tpmPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }

        .tpm-close-btn {
            position: absolute !important; top: 18px !important; right: 18px !important;
            width: 38px !important; height: 38px !important; border-radius: 50% !important;
            background: rgba(4, 75, 80, 0.05) !important; border: none !important; cursor: pointer !important;
            color: var(--teal) !important; font-size: 24px !important; z-index: 10 !important;
            display: flex !important; align-items: center !important; justify-content: center !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; line-height: 1 !important;
        }
        .tpm-close-btn:hover { background: var(--primary) !important; color: #fff !important; transform: rotate(90deg) scale(1.1) !important; }

        /* Modal Header */
        .tpm-modal-head { text-align: center; margin-bottom: 30px; }
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
        }
        .tpm-submit:hover { transform: translateY(-4px) scale(1.02) !important; box-shadow: 0 20px 45px rgba(217,122,92,0.5) !important; }
        .tpm-submit:active { transform: translateY(-1px) !important; }

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
        }
        .tpm-chat.tpm-minimized { width: 72px !important; height: 72px !important; border-radius: 50% !important; }
        
        .tpm-chat-header {
            background: linear-gradient(135deg, var(--teal), var(--teal-light)) !important;
            padding: 18px 22px !important; color: #fff !important;
            display: flex !important; justify-content: space-between !important;
            align-items: center !important; cursor: pointer !important;
        }
        .tpm-avatar {
            position: relative !important; width: 46px !important; height: 46px !important;
            background: rgba(255,255,255,0.15) !important; border-radius: 50% !important;
            display: flex !important; align-items: center !important; justify-content: center !important;
            transition: 0.3s;
        }
        .tpm-avatar-text { font-size: 14px; font-weight: 800; color: #fff; }
        .tpm-online-dot {
            position: absolute !important; bottom: 2px !important; right: 2px !important;
            width: 12px !important; height: 12px !important; background: #2ecc71 !important;
            border: 2px solid #fff !important; border-radius: 50% !important;
            animation: tpmPulse 2s infinite !important;
        }

        .tpm-messages {
            height: 320px !important; padding: 22px !important; overflow-y: auto !important;
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

        .tpm-chat-footer {
            padding: 18px 20px !important; background: #fff !important;
            border-top: 1px solid #f1f5f9 !important; display: flex !important; gap: 12px !important;
        }

        /* ── EXIT INTENT REDESIGN (THE GIFT CARD) ─────────────────────────── */
        .tpm-quiz {
            background: linear-gradient(to bottom right, #fff, #fdf9f7) !important;
            width: 95% !important; max-width: 440px !important; border-radius: 35px !important;
            padding: 50px 40px !important; text-align: center !important; position: relative !important;
            box-shadow: 0 50px 120px rgba(4, 75, 80, 0.3) !important;
            overflow: hidden;
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
        @keyframes tpmSlideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes tpmFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tpmFadeUp  { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes tpmPopIn   { 
            0% { transform: scale(0.85); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes tpmPulse   { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.8); opacity: 0.6; } }

        /* ── RESPONSIVE ──────────────────────────────────────────────────────── */
        @media (max-width: 768px) {
            .tpm-notif { bottom: 20px !important; right: 20px !important; left: 20px !important; max-width: none !important; }
            .tpm-modal { padding: 35px 25px !important; }
            .tpm-chat { width: calc(100% - 40px) !important; left: 20px !important; right: 20px !important; }
            .tpm-chat.tpm-minimized { width: 64px !important; height: 64px !important; left: auto !important; right: 20px !important; }
        }

        .tpm-off { display: none !important; opacity: 0 !important; visibility: hidden !important; }
    `;
    document.head.appendChild(style);

    // ─── HTML STRUCTURE ─────────────────────────────────────────────────────────
    var container = document.createElement('div');
    container.id = 'tpm-system-v2';
    container.innerHTML = `

    <!-- NOTIFICATION -->
    <div id="tpm-notif" class="tpm-notif tpm-off" style="display:none;">
        <div class="tpm-live-badge">Live</div>
        <p>A new Discovery Session was just claimed. 🧠</p>
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
                        <input type="tel" name="phone" required placeholder="e.g. 981889XXXX" pattern="[0-9]{10}" title="Please enter a valid 10-digit mobile number">
                        <span class="tpm-error-hint">Exactly 10 digits required</span>
                    </div>

                    <div class="tpm-field">
                        <label>HOW CAN WE HELP?</label>
                        <textarea name="message" required placeholder="Briefly describe what's on your mind..."></textarea>
                    </div>

                    <button type="submit" class="tpm-submit">Confirm Discovery Session</button>
                </div>
                <div id="tpm-form-msg"></div>
            </form>
            <p class="tpm-privacy">🔒 <span>Confidentiality Guaranteed.</span> Your data is 100% private.</p>
        </div>
    </div>

    <!-- CHAT WIDGET -->
    <div id="tpm-chat" class="tpm-chat tpm-minimized">
        <div class="tpm-chat-header" onclick="tpmToggleChat()">
            <div class="tpm-chat-agent">
                <div class="tpm-avatar">
                   <span class="tpm-avatar-text">TPM</span>
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
                    style="width:48px; height:48px; background:var(--primary); border:none; border-radius:12px; color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
            </button>
        </div>
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
                        <input type="tel" id="tpm-exit-phone" required placeholder="Enter 10-digit mobile" 
                               pattern="[0-9]{10}" style="width:100%; padding:14px; border:1.5px solid var(--border); border-radius:14px; outline:none;"
                               oninput="this.setCustomValidity('')" oninvalid="this.setCustomValidity('Please enter exactly 10 digits')">
                    </div>
                    
                    <button type="submit" class="tpm-submit">Connect via WhatsApp</button>
                    <div id="tpm-exit-msg"></div>
                </form>
            </div>
        </div>
    </div>
    `;
    document.body.appendChild(container);

    // ─── LOGIC & STATE ──────────────────────────────────────────────────────────
    var tpmState = { phase: 0, step: 0, data: {} };
    var TPM_COOKIE = 'tpm_v2_status';

    function setCookie(n, v) {
        var d = new Date();
        d.setTime(d.getTime() + (72 * 60 * 60 * 1000)); // 3 days
        document.cookie = n + '=' + v + ';expires=' + d.toUTCString() + ';path=/';
    }
    function getCookie(n) {
        var m = document.cookie.match(new RegExp('(^| )' + n + '=([^;]+)'));
        return m ? m[2] : null;
    }

    // ─── INITIALIZATION ─────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        // Notification trigger
        setTimeout(function () {
            var notif = document.getElementById('tpm-notif');
            if (notif) {
                notif.style.display = 'flex';
                notif.classList.remove('tpm-off');
                setTimeout(function () {
                    notif.classList.add('tpm-off');
                    setTimeout(function () { notif.style.display = 'none'; }, 600);
                }, 7000);
            }
        }, 3000);

        // Scroll trigger (30%)
        if (!getCookie(TPM_COOKIE)) {
            window.addEventListener('scroll', tpmScrollTrigger);
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
            document.body.classList.add('tpm-no-scroll');
            setCookie(TPM_COOKIE, 'seen');
        }
    }

    // ─── MODAL CONTROLS ─────────────────────────────────────────────────────────
    window.tpmClose = function () {
        var ov = document.getElementById('tpm-overlay');
        ov.classList.add('tpm-off');
        setTimeout(function () { ov.style.display = 'none'; }, 400);
        document.body.classList.remove('tpm-no-scroll');
        if (tpmState.phase === 1) {
            tpmState.phase = 2;
            setTimeout(tpmToggleChat, 4000);
        }
    };

    window.tpmSubmit = function (e) {
        e.preventDefault();
        var btn = e.target.querySelector('button[type="submit"]');
        var msg = document.getElementById('tpm-form-msg');
        
        // Final length check for phone
        var phone = e.target.phone.value;
        if (phone.length !== 10) {
            alert("Please enter exactly 10 digits for the WhatsApp number.");
            return;
        }

        btn.innerText = 'Connecting...';
        btn.disabled = true;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: new FormData(e.target)
        })
        .then(r => r.json())
        .then(res => {
            if (res.success) {
                msg.innerHTML = '<div style="color:#10b981; margin-top:15px; font-weight:700; font-size:14px; text-align:center;">✨ Confirmed! Dhivyaraksha will connect with you shortly.</div>';
                setTimeout(tpmClose, 3000);
            } else {
                msg.innerHTML = '<div style="color:#ef4444; margin-top:10px; font-size:13px; text-align:center;">Submission error. Please try again.</div>';
                btn.innerText = 'Confirm Discovery Session';
                btn.disabled = false;
            }
        })
        .catch(() => {
            msg.innerHTML = '<div style="color:#ef4444; margin-top:10px; font-size:13px; text-align:center;">Network issue. Check connection.</div>';
            btn.innerText = 'Confirm';
            btn.disabled = false;
        });
    };

    // ─── CHAT WIDGET CONTROLS ───────────────────────────────────────────────────
    window.tpmToggleChat = function () {
        var chat = document.getElementById('tpm-chat');
        if (chat.classList.contains('tpm-minimized')) {
            chat.classList.remove('tpm-minimized');
            if (tpmState.step === 0) {
                setTimeout(() => {
                    tpmBotMsg("Hi there! 🌿 I'm the Placid Minds assistant.");
                    setTimeout(() => {
                        tpmBotMsg("Would you like to start a professional mindset transformation today?"
                            + '<button class="tpm-option" onclick="tpmChatStart(\'Mindset Overhaul\')">🚀 Yes, let\'s start</button>'
                            + '<button class="tpm-option" onclick="tpmChatStart(\'Learn More\')">💡 Tell me more first</button>'
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
                    setTimeout(tpmCloseChat, 6000);
                });
        }
    };

    // ─── EXIT INTENT CONTROLS ───────────────────────────────────────────────────
    var exitShown = false;
    document.addEventListener('mouseleave', function (e) {
        if (e.clientY < 0 && !exitShown && tpmState.phase > 0) {
            exitShown = true;
            var ex = document.getElementById('tpm-exit');
            ex.style.display = 'flex';
            ex.classList.remove('tpm-off');
            document.body.classList.add('tpm-no-scroll');
        }
    });

    window.tpmExitNext = function (topic) {
        document.getElementById('tpm-exit-topic-hidden').value = "Exit Lead Interest: " + topic;
        document.getElementById('tpm-exit-step1').style.display = 'none';
        document.getElementById('tpm-exit-step2').style.display = 'block';
    };

    window.tpmCloseExit = function () {
        var ex = document.getElementById('tpm-exit');
        ex.classList.add('tpm-off');
        setTimeout(function () { ex.style.display = 'none'; }, 400);
        document.body.classList.remove('tpm-no-scroll');
    };

    window.tpmExitSubmit = function (e) {
        e.preventDefault();
        var phone = document.getElementById('tpm-exit-phone').value;
        if (phone.length !== 10) {
            alert("Exactly 10 digits required.");
            return;
        }

        var btn = e.target.querySelector('button');
        var msg = document.getElementById('tpm-exit-msg');
        btn.innerText = 'Connecting...';
        btn.disabled = true;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: new FormData(e.target)
        })
        .then(() => {
            msg.innerHTML = '<div style="color:#10b981; margin-top:20px; font-weight:700;">✅ Success! Talk to you soon.</div>';
            setTimeout(tpmCloseExit, 3000);
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
