import json
from typing import TYPE_CHECKING

from django.template import Context, Engine

if TYPE_CHECKING:
  from django.template import Template

engine = Engine()

with open("index_source.html") as f:
  template = engine.from_string(f.read())

with open("assets/json/members.json") as f:
  data = json.loads(f.read())

#<div class="member">
#   <img class="pfp" src="https://github.com/9551-Dev.png"/>
#   <h3>9551Dev</h3>
#   <div class="contacts">
#     <a href="https://github.com/9551-Dev">
#       <img src="assets/images/github.svg"/>
#     </a>
#     <a href="https://discord.com/users/508577166405926913">
#       <img src="assets/images/discord.svg"/>
#     </a>
#     <a href="https://9551.madefor.cc/estrogen_extraction/">
#       <img src="assets/images/horsie.png"/>
#     </a>
#   </div>
#   <div class="comments">
#     <p>The one next to me is a fucking bottom</p>
#   </div>
#</div>

memberhtml = ""
for member in data:
  contacts = f"""<div class="contacts">
  <a href="https://github.com/{member['github']}">
    <img src="assets/images/github.svg">
  </a>
  """
  for contact in member["links"]:
    contacts += f"""<a href="{contact['url']}">
  <img src="assets/images/{contact['icon']}">
</a>"""
  contacts += "</div>"
  memberhtml += f"""<div class="card">
  <img class="pfp" src="https://github.com/{member['github']}.png">
  <h3>{member['name']}</h3>
  {contacts}
  <div class="comments">
    <p>{member['desc']}</p>
  </div>
</div>
"""

# Build projects list
#             <div class="project">
#                <h3>Capy64 ASM</h3>
#                <p>By: VirtIO and AlexDevs</p>
#                <a href="https://github.com/ccaa-team/Capy64-programs/tree/main/asm" target="_blank">GitHub</a>
#            </div>

with open("assets/json/projects.json") as f:
  data = json.loads(f.read())

projecthtml = ""
for project in data:
  projecthtml += f"""<div class="card">
  <h3>{project["name"]}</h3>
  <p>By: {project["by"]}</p>
  <a href="{project["github"]} target="_blank">GitHub</a>
</div>
"""

ctx = Context({"member_cards": memberhtml,"projects":projecthtml})

rendered = template.render(ctx)

with open("index.html","w") as f:
  f.write(rendered)