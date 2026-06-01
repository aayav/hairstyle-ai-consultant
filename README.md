# 🎨 Hairstyle AI Consultant

**Premium dark-luxury Expo mobile app for AI-powered haircut recommendations**

## 🌟 Features

- 📸 Upload selfies for AI facial analysis
- 🤖 Gemini 2.5 Flash powered facial characteristics analysis
- ✨ Three personalized hairstyle recommendations
- 🖼️ Photorealistic "after" previews using BananaML
- 💎 Premium dark-luxury design with glassmorphism
- 📊 Detailed compatibility scoring & maintenance guides
- 📱 Interactive before/after sliders
- 💾 Save favorite looks to MongoDB
- 🎯 Barber-ready appointment cards
- 🔥 Trending cuts & style discovery
- 🧔 Beard pairing recommendations
- 📈 Hairstyle history tracking

## 📋 Tech Stack

- **Framework**: Expo / React Native
- **Language**: TypeScript
- **State Management**: Zustand
- **Animations**: React Native Reanimated
- **UI Effects**: Glassmorphism with expo-blur
- **AI Analysis**: Google Gemini 2.5 Flash
- **Image Generation**: BananaML (gemini-3.1-flash-image-preview)
- **Database**: MongoDB
- **API Client**: Axios
- **Navigation**: React Navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Xcode (for iOS) or Android Studio (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aayav/hairstyle-ai-consultant.git
   cd hairstyle-ai-consultant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your API keys:
   - `EXPO_PUBLIC_GEMINI_API_KEY` - Get from [Google AI Studio](https://aistudio.google.com)
   - `EXPO_PUBLIC_BANANAML_API_KEY` - Get from [BananaML](https://banana.dev)
   - `EXPO_PUBLIC_MONGODB_URI` - Your MongoDB connection string

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/emulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web (preview)
   npm run web
   ```

## 🏗️ Project Structure

```
hairstyle-ai-consultant/
├── app/                          # Expo Router app directory
│   ├── (auth)/                   # Authentication screens
│   ├── (main)/                   # Main app screens
│   └── _layout.tsx               # Root layout
├── src/
│   ├── api/                      # API services (Gemini, BananaML)
│   ├── components/               # Reusable React components
│   │   ├── ui/                   # UI primitives
│   │   ├── analysis/             # Facial analysis components
│   │   ├── recommendations/      # Recommendation display components
│   │   ├── filters/              # Preference filters
│   │   └── barber/               # Barber appointment components
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # TypeScript type definitions
│   ├── utils/                    # Utility functions
│   └── store/                    # Zustand state management
├── assets/                       # Images, fonts, animations
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── README.md                     # This file
```

## 🎨 Design System

### Color Palette
- **Background**: #0a0a0a (Deep Black)
- **Gold Accent**: #d4af37 (Luxury Gold)
- **Glass**: rgba(255, 255, 255, 0.08) (Glassmorphism)

### Components
- GlassmorphCard - Frosted glass panels
- PremiumButton - 3 variants (primary, secondary, ghost)
- FacialScanAnimation - Biometric scanning animation
- StyleCard - Expandable hairstyle recommendation cards
- BeforeAfterSlider - Interactive comparison slider

## 🔄 User Flow

1. **Welcome** - Onboarding introduction
2. **Upload** - Capture or select a selfie
3. **Analysis** - Animated facial analysis with Gemini
4. **Quiz** - Quick preference questionnaire
5. **Recommendations** - Three personalized hairstyle options
6. **Preview** - Photorealistic "after" images
7. **Compare** - Interactive before/after slider
8. **Save** - Store to favorites or Barber card
9. **Discover** - Browse trending cuts & styles

## 🤖 AI Analysis Features

### Facial Analysis (Gemini 2.5 Flash)
- Face shape detection (oval, round, square, heart, oblong, diamond, triangular)
- Facial features assessment (forehead, cheekbones, jawline, symmetry)
- Hair characteristics (texture, density, hairline, condition)
- Skin tone analysis (undertone, depth, luminosity)
- Style profile scoring (professional, fashion-forward, classic)

### Hairstyle Recommendations
- Top 3 personalized haircut suggestions
- Compatibility scoring (face shape, texture, maintenance, lifestyle, professional)
- Maintenance guides & styling routines
- Product recommendations
- Barber complexity ratings
- Growth behavior predictions

### Preview Generation (BananaML)
- Photorealistic "after" previews
- Identity preservation
- Skin tone & lighting consistency
- Hair styling variations

## 📱 Platform Support

- ✅ iOS 13+
- ✅ Android 5+
- ✅ Web (preview mode)

## 🔑 API Keys Setup

### Google Gemini API
1. Visit [Google AI Studio](https://aistudio.google.com)
2. Create a new API key
3. Add to `.env`: `EXPO_PUBLIC_GEMINI_API_KEY=your_key`

### BananaML API
1. Sign up at [banana.dev](https://banana.dev)
2. Create an API key
3. Add to `.env`: `EXPO_PUBLIC_BANANAML_API_KEY=your_key`

### MongoDB
1. Create cluster at [mongodb.com](https://mongodb.com)
2. Get connection string
3. Add to `.env`: `EXPO_PUBLIC_MONGODB_URI=your_uri`

## 📦 Building for Production

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to app stores
eas submit
```

## 🤝 Contributing

Contributions welcome! Please follow the code style and submit PRs to `develop` branch.

## 📄 License

MIT License - feel free to use this project commercially

## 🎯 Roadmap

- [ ] Voice consultation feature
- [ ] AR try-on functionality
- [ ] Social sharing & community
- [ ] Integration with real barber networks
- [ ] Video tutorials for styling
- [ ] Seasonal trend updates
- [ ] Premium subscription tiers

## 💬 Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

**Built with ❤️ for barbers, stylists, and everyone looking to make confident hair decisions**
