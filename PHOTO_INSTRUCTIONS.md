# Profile Photo Setup

## Add Your Photo

To complete the marquee design, you need to add your profile photo:

1. **Place your photo in:**
   ```
   public/images/profile-photo.jpg
   ```

2. **Photo Requirements:**
   - Format: JPG or PNG
   - Recommended size: 400x400px or larger (square)
   - The photo will be automatically cropped to a circle
   - Make sure it's a good headshot/portrait

3. **After adding the photo:**
   - The marquee will automatically display it
   - It will appear as a circular photo next to your name

## Alternative: Use Existing Image

If you want to use a different image name or path, update `src/index.html`:

```html
<img src="/images/YOUR-PHOTO-FILENAME.jpg" alt="Ricardo Rivera">
```

Change all three instances in the marquee section.

## Current Status

The marquee is set up and ready! Once you add your photo, it will display automatically. Until then, you'll see a placeholder icon.

