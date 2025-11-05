# Domain Setup Checklist: richrd.com → Vercel

## ✅ Step 1: Add Domain in Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `richrd.com`
6. Click **Add**

Vercel will show you DNS records to add.

---

## ✅ Step 2: Get DNS Records from Vercel

After adding the domain, Vercel will show you DNS records like:

**For root domain (richrd.com):**
```
Type: A
Name: @
Value: 76.76.21.21 (or IPs Vercel provides)
```

**For www subdomain (www.richrd.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Note:** Vercel may provide multiple A records - add all of them!

---

## ✅ Step 3: Update DNS at GoDaddy

### Access GoDaddy DNS:

1. Go to [godaddy.com](https://godaddy.com)
2. Log in
3. **My Products** → Find `richrd.com` → Click **DNS**
   - Or go to **My Products** → **Web Hosting** → **DNS Management**

### Add/Update Records:

**A Record for root domain:**
1. Click **Add** or find existing A record for `@`
2. Type: **A**
3. Name: **@** (or leave blank)
4. Value: **IP address from Vercel** (e.g., `76.76.21.21`)
5. TTL: **1 Hour**
6. Click **Save**

**CNAME Record for www:**
1. Click **Add** or find existing CNAME for `www`
2. Type: **CNAME**
3. Name: **www**
4. Value: **cname.vercel-dns.com** (or what Vercel shows)
5. TTL: **1 Hour**
6. Click **Save**

### Remove Old Records:

- Delete any A/CNAME records pointing to GoDaddy hosting
- **Keep MX records** (for email if you use it)

---

## ✅ Step 4: Wait for DNS Propagation

- Usually takes **5-60 minutes**
- Can take up to 24 hours (rare)
- Check status in Vercel dashboard - will show "Valid Configuration" when ready

### Check DNS Propagation:

- Visit [dnschecker.org](https://dnschecker.org)
- Enter: `richrd.com`
- Select: **A** record
- Check if it shows Vercel's IP addresses

---

## ✅ Step 5: Verify Everything Works

- [ ] Visit `richrd.com` - loads your site ✅
- [ ] Visit `www.richrd.com` - works or redirects ✅
- [ ] HTTPS works (green lock) ✅
- [ ] All links work ✅
- [ ] Images load correctly ✅
- [ ] Mobile responsive ✅

---

## 🔒 SSL Certificate

Vercel automatically provisions SSL certificates:
- Usually ready within minutes of DNS propagation
- Check Vercel dashboard for SSL status
- HTTPS will work automatically once DNS is configured

---

## 📧 Email (If You Use It)

If you use email with your domain:
- **Keep MX records** unchanged in GoDaddy
- Only change A/CNAME records for web
- Email will continue working!

---

## 🆘 Troubleshooting

### Domain not working after 1 hour?

1. **Double-check DNS records:**
   - Values must match exactly what Vercel shows
   - No typos or extra spaces

2. **Check DNS propagation:**
   - Use [dnschecker.org](https://dnschecker.org)
   - Should show Vercel IPs globally

3. **Clear browser cache:**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

4. **Check Vercel dashboard:**
   - Should show "Valid Configuration"
   - Look for any error messages

### HTTPS not working?

- Wait for DNS to fully propagate (can take time)
- SSL certificate is provisioned automatically
- Check SSL status in Vercel dashboard

### Still having issues?

- Check Vercel deployment logs
- Verify DNS records match exactly
- Contact Vercel support (they're very responsive)

---

## 📝 Quick Reference

**Vercel Dashboard:**
- Settings → Domains → Add `richrd.com`

**GoDaddy DNS:**
- My Products → DNS → Add/Edit records

**DNS Records Needed:**
- A record: `@` → Vercel IP
- CNAME: `www` → `cname.vercel-dns.com`

**Check Status:**
- Vercel dashboard shows "Valid Configuration"
- [dnschecker.org](https://dnschecker.org) shows Vercel IPs

---

**Once DNS propagates, you're all set!** 🎉

Your site will be:
- ✅ Fast (global CDN)
- ✅ Secure (automatic HTTPS)
- ✅ Reliable (Vercel infrastructure)
- ✅ Free (personal projects)

