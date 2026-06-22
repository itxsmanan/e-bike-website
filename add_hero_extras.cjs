const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

const heroExtras = `
/* ── Hero Extras (Restored) ─────────────────────────────────────────── */

.hero-particles { position:absolute; inset:0; pointer-events:none; overflow:hidden; z-index:1; }
.hero-particle {
  position:absolute; border-radius:50%;
  background:radial-gradient(circle, rgba(232,197,116,0.7) 0%, rgba(201,169,98,0.2) 60%, transparent 100%);
  animation:heroParticleFloat linear infinite;
}
.hp-1  { width:4px;  height:4px;  left:5%;  top:25%; animation-duration:9s;  animation-delay:0s;  }
.hp-2  { width:6px;  height:6px;  left:15%; top:70%; animation-duration:12s; animation-delay:1s;  }
.hp-3  { width:3px;  height:3px;  left:25%; top:15%; animation-duration:8s;  animation-delay:2.5s; }
.hp-4  { width:5px;  height:5px;  left:40%; top:85%; animation-duration:11s; animation-delay:0.5s; }
.hp-5  { width:4px;  height:4px;  left:55%; top:30%; animation-duration:10s; animation-delay:3s;  }
.hp-6  { width:3px;  height:3px;  left:65%; top:60%; animation-duration:7s;  animation-delay:1.5s; }
.hp-7  { width:6px;  height:6px;  left:75%; top:10%; animation-duration:13s; animation-delay:0.8s; }
.hp-8  { width:2px;  height:2px;  left:85%; top:80%; animation-duration:9s;  animation-delay:2s;  }
.hp-9  { width:5px;  height:5px;  left:90%; top:40%; animation-duration:14s; animation-delay:1.2s; }
.hp-10 { width:4px;  height:4px;  left:50%; top:50%; animation-duration:8s;  animation-delay:4s;  }

@keyframes heroParticleFloat {
  0%   { transform:translateY(0) translateX(0) scale(1);   opacity:0;   }
  10%  { opacity:0.8; }
  90%  { opacity:0.4; }
  100% { transform:translateY(-250px) translateX(60px) scale(0.5); opacity:0; }
}

@keyframes statFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes scrollDotBounce {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(22px); opacity: 0.3; }
}
`;

if (!css.includes('heroParticleFloat')) {
  css += '\n' + heroExtras;
  fs.writeFileSync('src/index.css', css);
  console.log('Appended hero extras!');
} else {
  console.log('Hero extras already exist.');
}
