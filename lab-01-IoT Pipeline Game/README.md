# 🎯 IoT Pipeline Game

A simple, educational web application that teaches IoT data pipeline concepts through an interactive drag-and-drop quiz. Users must arrange 7 pipeline components in the correct logical sequence.

## 🚀 Features

- **Interactive Drag & Drop**: Intuitive component placement
- **Educational Content**: Learn real IoT data pipeline concepts
- **Randomized Challenges**: Components shuffled for each game
- **Real-time Feedback**: Immediate validation and scoring
- **Comprehensive Logging**: Track all user actions and game events
- **Responsive Design**: Works on desktop and mobile devices
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## 🏗️ Architecture

The game teaches the following data pipeline sequence:

1. **📡 Ingestion Layer** - Data collection from IoT devices
2. **🗄️ Storage Layer** - Raw data storage in data lake
3. **🥉 Bronze Layer** - Raw data preservation
4. **🥈 Silver Layer** - Cleaned and validated data
5. **🥇 Gold Layer** - Business-ready aggregated data
6. **🔍 Query Platform** - Data access and querying
7. **📊 Visualization** - Data presentation and reporting

## 🎮 How to Play

1. **Study Components**: Read the descriptions in the Component Library
2. **Think Logic**: Understand the data flow sequence
3. **Drag & Drop**: Place components in the numbered steps
4. **Submit**: Click "Check Answer" to validate your solution
5. **Learn**: Review your score and understand any mistakes

## 🚀 Getting Started

### Option 1: Simple Local Development
```bash
# Navigate to the lab-01 directory
cd lab-01

# Open index.html in your browser
# Or use a simple HTTP server:
python -m http.server 8000
# Then visit http://localhost:8000
```

### Option 2: Docker Deployment (Optional)
```bash
# Build the Docker image
docker build -t iot-pipeline-game .

# Run the container
docker run -p 8080:80 iot-pipeline-game

# Visit http://localhost:8080
```

### Option 3: Any Web Server
Simply upload the files to any web server or hosting service.

## 📁 File Structure

```
lab-01/
├── index.html          # 🎯 Main game interface
├── style.css           # 🎨 Clean, responsive styling
├── script.js           # 🧠 Game logic & drag-and-drop
├── Dockerfile          # 🐳 Simple nginx container (optional)
└── README.md           # 📚 This documentation
```

## 🔧 Technical Details

### Technology Stack
- **Frontend**: HTML5, CSS3, ES6+ JavaScript
- **Drag & Drop**: Native HTML5 Drag and Drop API
- **Styling**: Modern CSS with Grid, Flexbox, and animations
- **Container**: Lightweight nginx for deployment

### Key Features
- **Session-based Game State**: No persistence, simple design
- **Real-time Validation**: Immediate feedback on component placement
- **Scoring System**: Points for correct placement + time bonus
- **Responsive Design**: Works on all device sizes
- **Accessibility**: Keyboard support and clear visual feedback

## 📊 Game Mechanics

### Scoring System
- **Base Score**: 100 points per correctly placed component
- **Time Bonus**: Up to 300 points for completing under 5 minutes
- **Maximum Score**: 1000 points (700 base + 300 time bonus)

### Validation Rules
- Each component must be placed in exactly one position
- Each position can only contain one component
- Components cannot be moved once placed (reset game to try again)

## 🎨 Customization

### Adding New Components
Edit the `components` array in `script.js`:

```javascript
{
    id: 'new-component',
    title: '🆕 New Component',
    description: 'Description of the new component',
    correctPosition: 8,
    color: '#your-color'
}
```

### Modifying Styling
All visual styling is in `style.css` with clear CSS custom properties and organized sections.

### Changing Game Logic
The game logic is modular and well-commented in `script.js` for easy modification.

## 🐛 Troubleshooting

### Common Issues

1. **Drag and Drop Not Working**
   - Ensure you're using a modern browser
   - Check that JavaScript is enabled
   - Look for console errors

2. **Components Not Rendering**
   - Check browser console for JavaScript errors
   - Verify all files are in the same directory
   - Ensure proper file permissions

3. **Styling Issues**
   - Clear browser cache
   - Check CSS file path in HTML
   - Verify CSS syntax

### Debug Mode
The game includes comprehensive logging. Check:
- **Action Log Panel**: Shows all user actions and game events
- **Browser Console**: Detailed logging for developers
- **Network Tab**: Verify all files are loading correctly

## 🚀 Performance

- **Load Time**: < 1 second on modern devices
- **Memory Usage**: Minimal, no memory leaks
- **Responsiveness**: Smooth 60fps animations
- **Cross-browser**: Compatible with all modern browsers

## 🎓 Educational Value

### Learning Objectives
1. **Data Pipeline Architecture**: Understanding data flow
2. **Data Lake Concepts**: Bronze, Silver, Gold layers
3. **Data Engineering Dependencies**: Logical sequencing
4. **Critical Thinking**: Problem-solving without hints

### Target Audience
- Data Engineering students
- IoT professionals
- Anyone interested in data pipelines
- Educational institutions

## 🔮 Future Enhancements

### Easy to Add
- Multiple difficulty levels
- Time-based challenges
- Leaderboard system
- Custom pipeline scenarios
- Sound effects and more animations

### Technical Improvements
- Local storage for game progress
- Export/import game states
- Accessibility improvements
- PWA capabilities

## 🤝 Contributing

This is a simple, educational project. Feel free to:
- Report bugs
- Suggest improvements
- Add new features
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Acknowledgments

- Built with simplicity in mind
- Focused on educational value
- Demonstrates that simple solutions often work best

---

**🎯 The IoT Pipeline Game demonstrates that simple, focused design often produces better results than complex, feature-rich solutions.**

**Sometimes less really is more!** ✨
