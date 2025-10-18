# Quick Start - Deploying to Cloudflare

## ✅ What's Been Fixed
- Removed `plotly.js-dist-min` (3.5MB) that was causing memory issues
- Created custom Plotly build with only Surface3D (~1.5MB)
- Optimized Next.js build configuration
- Fixed build command for OpenNext

---

## 🚀 Deploy Now (3 Steps)

### Step 1: Test Locally (Optional but Recommended)
```powershell
npm run dev
```
Visit: http://localhost:3000/plotly_surface_extreme_shape
Verify the 3D plot works.

### Step 2: Commit and Push
```powershell
git add .
git commit -m "Fix: Optimize Plotly bundle for Cloudflare memory limits"
git push origin main
```

### Step 3: Configure Cloudflare Pages
Go to your Cloudflare Pages dashboard and set:

**Build Configuration:**
- Build command: `npm run build`
- Build output directory: `.open-next`
- Node version: `20`

**Environment Variables** (all environments):
```
RESEND_API_KEY=re_4J4zU9Ei_Bdy931qiE3dKJSGtizjMfuo3
TURNSTILE_SECRET_KEY=0x4AAAAAAB7WF7rBpuRCm32EwmR-qmtOtt0
CONTACT_EMAIL=alexfiliakov@gmail.com
NODE_VERSION=20
```

---

## 🧪 Test Production Build Locally

Before deploying, you can test the production build:

```powershell
# Build for production
npm run build

# Preview with Wrangler
npm run preview:cf
```

If the build completes successfully, you're good to deploy!

---

## 📊 Expected Results

### Build Output:
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size
┌ ○ /                                   XXX kB
├ ○ /about                              XXX kB
├ ○ /contact                            XXX kB
└ ○ /plotly_surface_extreme_shape       XXX kB
```

### Deployment:
- Build time: ~3-5 minutes (was failing before)
- Bundle size: ~1.5MB (was ~4.5MB before)
- Memory usage: Within limits ✅

---

## ⚠️ Troubleshooting

### If build still fails:
1. Check Node version is set to `20` in Cloudflare
2. Verify `.open-next` is set as build output directory
3. Check build logs for specific error messages

### If 3D plot doesn't render:
1. Open browser console (F12)
2. Look for import errors related to Plotly
3. Verify `/plotly_surface_extreme_shape` page loads

### If contact form doesn't work:
1. Verify environment variables are set in Cloudflare
2. Check Cloudflare Workers logs
3. Test Turnstile is working (you should see the widget)

---

## 📚 More Information

- **Full deployment guide**: See `CLOUDFLARE_DEPLOYMENT.md`
- **Technical details**: See `MEMORY_FIX_SUMMARY.md`
- **OpenNext docs**: https://opennext.js.org/cloudflare

---

## ✨ What You Can Do Now

Your site should now:
- ✅ Build successfully on Cloudflare Pages
- ✅ Display 3D surface plots
- ✅ Handle contact form submissions (Server Actions)
- ✅ Load faster (smaller bundle)
- ✅ Work on mobile devices

Ready to deploy? Just push to GitHub! 🎉
