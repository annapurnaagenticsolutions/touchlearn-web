import os
import re

directory = 'src/games'

back_button_replacement = """<button 
                    onClick={() => { sfx.play('click'); onBack(); }}
                    style={{
                        fontSize: '20px', 
                        background: '#FF9AA2', 
                        border: '4px solid #FFB7B2', 
                        color: 'white', 
                        cursor: 'pointer', 
                        fontWeight: '900',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        boxShadow: '0 6px 0 #FFB7B2',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                        zIndex: 100
                    }}
                    className="glossy"
                    onPointerDown={(e) => { e.currentTarget.style.transform = 'translateY(6px)'; e.currentTarget.style.boxShadow = '0 0 0 #FFB7B2'; }}
                    onPointerUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #FFB7B2'; }}
                    onPointerLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 0 #FFB7B2'; }}
                >
                    <span style={{ fontSize: '28px' }}>⬅️</span> Menu
                </button>"""

regex2 = re.compile(r'<button\s+[^>]*onClick=\{[^>]*onBack[^>]*\}[^>]*>[\s\n]*← Back[\s\n]*</button>', re.DOTALL)

for filename in ['FirefighterGame.tsx', 'KitchenRoleplay.tsx', 'MascotDressUp.tsx', 'PatternRepeatGame.tsx']:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = regex2.subn(back_button_replacement, content)
    if count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Replaced {count} buttons in {filename}")
    else:
        print(f"No match in {filename}")
