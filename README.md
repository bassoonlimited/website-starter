# Field Studio — starter website

A business landing page you can edit yourself later through a simple admin
panel at `yoursite.com/admin` — no code required for content changes.

## What's in here

```
index.html          the page itself
css/style.css        all styling
js/script.js          loads content from content/content.json and populates the page
content/content.json  all your editable text (headline, services, testimonials, contact info)
admin/                the admin panel (Decap CMS) that edits content.json for you
netlify.toml          hosting config
images/                put your photos here
```

The trick that makes this maintainable: the page never has your real text
hard-coded into the HTML. It fetches `content/content.json` and fills in the
page with it. The admin panel is just a friendly form that edits that one
file for you and saves it back to your GitHub repository — Netlify then
rebuilds the live site automatically.

---

## Part 1 — Preview it on your own computer

1. Install **VS Code**: https://code.visualstudio.com
2. Inside VS Code, go to the Extensions panel (left sidebar) and install
   **"Live Server"** by Ritwick Dey.
3. Open this whole `website-starter` folder in VS Code (`File > Open Folder`).
4. Right-click `index.html` → **"Open with Live Server"**. Your site opens in
   the browser and auto-refreshes whenever you save a file.

At this stage, try editing `content/content.json` and saving — you'll see the
page update live. This is exactly what the admin panel will do for you later,
just through a form instead of raw JSON.

---

## Part 2 — Put it on the internet

### Step 1: Create a GitHub repository
1. Install **Git**: https://git-scm.com and create a free account at
   https://github.com
2. In GitHub, click **New repository**, name it (e.g. `my-business-site`),
   keep it public or private, and create it.
3. In VS Code's terminal (`Terminal > New Terminal`), run, inside this folder:
   ```
   git init
   git add .
   git commit -m "First version of the site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

### Step 2: Deploy on Netlify
1. Create a free account at https://netlify.com
2. Click **Add new site > Import an existing project > GitHub**, and select
   your repository.
3. Leave the build settings as-is (there's no build step — it's a static
   site) and click **Deploy**. In under a minute you'll get a live URL like
   `https://random-name-123.netlify.app`.
4. Optional: under **Domain settings**, you can add your own custom domain
   name, or rename the free `netlify.app` subdomain.

### Step 3: Turn on the admin panel
1. In your Netlify site dashboard, go to **Site configuration > Identity**
   and click **Enable Identity**.
2. Still under Identity, go to **Registration** and set it to **Invite only**
   (so strangers can't sign up on your site).
3. Go to **Services > Git Gateway** (under Identity settings) and click
   **Enable Git Gateway**. This lets the admin panel save changes back to
   GitHub on your behalf.
4. Go to the **Identity** tab and click **Invite users** — invite your own
   email address. Check your inbox and accept the invite, which lets you set
   a password.
5. Visit `https://your-site.netlify.app/admin` and log in with that email
   and password.

You'll now see a form-based editor for your headline, about text, services,
process steps, testimonials, and contact details. Any change you save there
gets committed to your GitHub repo, and Netlify redeploys the live site
automatically within a minute or so.

---

## Part 3 — Turning on the contact form (optional)

The contact form currently just shows an alert instead of sending anywhere.
To make it actually send you messages via Netlify's free form handling:

1. In `index.html`, find `<form class="contact-form" id="contactForm">` and
   add `data-netlify="true"` and `name="contact"` to that tag, plus a hidden
   input `<input type="hidden" name="form-name" value="contact">` right
   inside the form.
2. In `js/script.js`, remove the `e.preventDefault()` line inside
   `setupForm()` so the browser submits the form normally.
3. Push the change (`git add . && git commit -m "enable form" && git push`).
   Netlify auto-detects the form on the next deploy, and submissions will
   show up under **Forms** in your Netlify dashboard (with optional email
   notifications you can turn on there).

---

## Making design changes later

Content (text, services, testimonials, contact info) → edit through
`/admin`, no code needed.

Layout, colors, fonts, or adding new sections → these live in `index.html`
and `css/style.css`. Open the folder in VS Code, make changes, preview with
Live Server, then `git add . && git commit -m "message" && git push` to
publish. Netlify redeploys automatically on every push to `main`.

## Swapping in your own business

- Replace all text in `content/content.json` (or just use `/admin` once
  it's set up) — company name, services, testimonials, contact details.
- Drop your own photos into the `images/` folder and reference them in
  `index.html` with `<img src="images/yourphoto.jpg">`.
- Update the `<title>` and `<meta name="description">` tags at the top of
  `index.html`.
- Update the logo text in the header (`<a href="#top" class="logo">`).
