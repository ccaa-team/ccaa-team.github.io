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

contacttmpl = """<a href="{url}"><img src="assets/images/{icon}"></a>
"""

membertmpl = """<div class="card">
  <img class="pfp" src="https://github.com/{github}.png">
  <h3>{name}</h3>
  {contacts}
  <div class="comments">
    <p>{desc}</p>
  </div>
</div>
"""

memberhtml = ""
for member in data:
  contacts = f"""<div class="contacts">
  <a href="https://github.com/{member['github']}">
    <img src="assets/images/github.svg">
  </a>
  """
  for contact in member["links"]:
    contacts += contacttmpl.format(url=contact["url"],icon=contact["icon"])
  contacts += "</div>"
  memberhtml += membertmpl.format(github=member["github"],name=member["name"],contacts=contacts,desc=member["desc"])

# Build projects list
#             <div class="project">
#                <h3>Capy64 ASM</h3>
#                <p>By: VirtIO and AlexDevs</p>
#                <a href="https://github.com/ccaa-team/Capy64-programs/tree/main/asm" target="_blank">GitHub</a>
#            </div>

with open("assets/json/projects.json") as f:
  data = json.loads(f.read())

projecttmpl = """<div class="card">
  <img class="projicon" src="assets/images/{icon}">
  <h3>{name}</h3>
  <p>By: {authors}</p>
  <div class="contacts">
    {contacts}
  </div>
  <div class="comments">
    <p>{desc}</p>
  </div>
</div>"""

projecttmpl_noicon = """<div class="card">
  <h3>{name}</h3>
  <p>By: {authors}</p>
  <div class="contacts">
    {contacts}
  </div>
  <div class="comments">
    <p>{desc}</p>
  </div>
</div>"""

projecthtml = ""
for project in data:
  contacts = ""
  for link in project["links"]:
    contacts += contacttmpl.format(url=link["url"],icon=link["icon"])

  if "icon" in project:
    projecthtml += projecttmpl.format(name=project["name"],authors=project["authors"],contacts=contacts,desc=project["desc"],icon=project["icon"])
  else:
    projecthtml += projecttmpl_noicon.format(name=project["name"],authors=project["authors"],contacts=contacts,desc=project["desc"])

ctx = Context({"member_cards": memberhtml,"projects":projecthtml})

rendered = template.render(ctx)

with open("index.html","w") as f:
  f.write(rendered)
