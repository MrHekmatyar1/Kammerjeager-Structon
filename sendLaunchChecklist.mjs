import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY || 're_..._mock_key_...');

(async function() {
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'edorkalchuk@gmail.com',
            subject: 'WICHTIG: Checkliste fuer den Live-Start & Datenbank-Setup',
            html: `
                <h2>Hallo Yehor, hier ist deine Checkliste fuer den Launch:</h2>
                <h3>1. Supabase (Datenbank & Auth)</h3>
                <ul>
                    <li><strong>E-Mail Setup:</strong> In Supabase unter <em>Authentication -> E-Mail Templates</em> musst du die URLs anpassen (von localhost auf deine echte Vercel-Domain).</li>
                    <li><strong>Custom SMTP:</strong> Richte in Supabase unter <em>Auth -> Providers -> Email</em> deinen eigenen SMTP-Server (oder Resend) ein, damit die Bestaetigungsmails nicht im Spam landen.</li>
                    <li><strong>Google Login:</strong> Unter <em>Auth -> Providers -> Google</em> musst du die echten Client ID / Secret von der Google Cloud Console fuer die Produktionsdomain eintragen.</li>
                </ul>
                <h3>2. Resend (E-Mails)</h3>
                <ul>
                    <li>Du nutzt aktuell die Test-Domain (onboarding@resend.dev). Du musst in Resend deine Domain <strong>kammerjaeger-structon.de</strong> (oder deine echte) hinzufuegen und die DNS-Records (TXT/MX) bei deinem Domain-Anbieter eintragen.</li>
                </ul>
                <h3>3. Stripe (Zahlungen)</h3>
                <ul>
                    <li>Du musst Stripe vom Test-Modus in den <strong>Live-Modus</strong> schalten.</li>
                    <li>Ersetze alle <code>pk_test_...</code> und <code>sk_test_...</code> Keys in Vercel mit den Live-Keys.</li>
                    <li>Der Webhook muss in Stripe fuer die Live-URL neu angelegt werden, und das neue <code>whsec_...</code> Secret muss in Vercel gespeichert werden.</li>
                </ul>
                <h3>4. Google & Tracking</h3>
                <ul>
                    <li><strong>Google Search Console:</strong> Reiche deine Sitemap (sitemap.xml) ein, sobald der Content final ist.</li>
                    <li><strong>Google Analytics:</strong> Erstelle eine Property und füge die GA4-ID (G-XXXXXXX) in den Code ein.</li>
                    <li><strong>Cookie-Banner:</strong> In Deutschland Pflicht! Wir muessen noch einen Cookie-Banner (z.B. Cookiebot) einbauen, bevor du live gehst und Ads schaltest.</li>
                </ul>
                <p>Ich erstelle gerade deinen SEO-Plan fuer Berlin, Potsdam und Hennigsdorf direkt im Editor (wird gleich als Artifact angezeigt).</p>
                <p>Dein Antigravity Agent</p>
            `
        });
        console.log('Email sent:', data);
    } catch (e) {
        console.error('Error:', e);
    }
})();
