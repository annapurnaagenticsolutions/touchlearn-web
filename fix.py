import os

folder = r"D:\vision_agentic\web_apps\touchlearn-web\src\games"
for root, dirs, files in os.walk(folder):
    for f in files:
        if f.endswith(".tsx"):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            
            # replace \` with `
            new_content = content.replace("\\`", "`")
            # replace \$ with $
            new_content = new_content.replace("\\$", "$")
            
            if new_content != content:
                with open(path, "w", encoding="utf-8") as file:
                    file.write(new_content)
                print(f"Fixed {f}")
