# Portfolio Website - Ugochukwu Chibuzor
A modern, responsive portfolio website for showcasing my Flutter projects and UI/UX designs.

```📁 Project Structure
portfolio/
├── index.html              # Homepage
├── flutter-projects.html   # Flutter projects page
├── uiux-designs.html      # UI/UX designs page
├── styles.css             # Custom styles
├── script.js              # Main JavaScript
├── load-projects.js       # Project loading logic
├── load-designs.js        # Design loading logic
├── data/
│   ├── projects.json      # Flutter projects data
│   └── designs.json       # UI/UX designs data
├── assets/
│   ├── profile.jpg        # Your profile photo
│   ├── flutter-logo.png   # Flutter logo
│   ├── app-design-preview.png  # App design preview
│   ├── icons/            # Skill icons
│   │   ├── flutter.png
│   │   ├── dart.png
│   │   ├── javascript.png
│   │   └── ... (other skill icons)
│   ├── projects/         # Project screenshots and videos
│   │   ├── task-manager(example)/
│   │   │   ├── screenshot1.png
│   │   │   ├── screenshot2.png
│   │   │   └── demo.mp4
│   │   └── ... (other projects)
│   └── designs/          # Design screenshots
│       ├── banking-app/
│       │   ├── screen1.png
│       │   └── ...
│       └── ... (other designs)
└── downloads/            # Downloadable files
    ├── task-manager-android.apk
    ├── task-manager-windows.exe
    └── ... (other downloads)
```

## 🚀 Getting Started
1. Setup Your Files
- Clone or download this project structure
- Add your profile photo to assets/profile.jpg
- Add skill icons to assets/icons/ directory
- Update personal information in index.html:
    - Name, description, about section
    - Social media links in the contact section
    - Email address

2. Add Your Projects
Edit data/projects.json to add your Flutter projects:
```json
{
  "name": "Your App Name",
  "description": "Detailed description of your app",
  "platforms": ["Android", "iOS", "Windows", "macOS"],
  "tags": ["Tag1", "Tag2", "Tag3"],
  "images": [
    "assets/projects/your-app/screenshot1.png",
    "assets/projects/your-app/screenshot2.png"
  ],
  "demoVideo": "assets/projects/your-app/demo.mp4",
  "downloads": {
    "Android (.apk)": "downloads/your-app-android.apk",
    "Windows (.exe)": "downloads/your-app-windows.exe"
  },
  "links": {
    "GitHub": "https://github.com/yourusername/your-app",
    "Play Store": "https://play.google.com/store/apps/details?id=com.example.app"
  }
}
```
**Steps:**
- Create a folder in assets/projects/ for each project
- Add screenshots (PNG/JPG format recommended)
- Add demo video (MP4 format, optional)
- Place downloadable files (.apk, .exe, .dmg) in the downloads/ folder

3. Add Your Designs
Edit data/designs.json to add your UI/UX designs:
```json
{
  "name": "Your Design Name",
  "description": "Description of your design",
  "category": "Mobile App Design",
  "tags": ["UI", "UX", "Figma"],
  "images": [
    "assets/designs/your-design/screen1.png",
    "assets/designs/your-design/screen2.png"
  ],
  "figmaLink": "https://www.figma.com/file/your-design",
  "prototypeLink": "https://www.figma.com/proto/your-prototype",
  "tools": ["Figma", "Adobe Illustrator"]
}
```
**Steps:**
- Create a folder in assets/designs/ for each design
- Export screens from Figma as PNG (2x or 3x for best quality)
- Add Figma file link and prototype link
