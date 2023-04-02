import os
import math
import yaml
import shutil
from pathlib import Path
from jinja2 import Template

def render(articles_per_page: int):

    # Delete existing pages and researches
    folders = ["../profile/research"]
    [os.remove(os.path.join(folder, file)) for folder in folders for file in os.listdir(folder)]

    # Get yaml files
    files = list(Path("../contents").glob("*.yaml"))
    number_pages = math.ceil(len(files) / articles_per_page)

    # Get articles data from yaml files
    cnt = 0
    articles = []
    page_articles = []
    for i in range(len(files)):
        with open(files[i], "r") as file:
            text = file.read()
        content = yaml.safe_load(text)
        links = []
        for link in content["external"]:
            links.append(dict(
                name = link["name"],
                url = link["url"]
            ))
        page_articles.append(dict(
            id = cnt,
            title = content["title"],
            title_cont = content["title_cont"],
            abstract = content["abstract"],
            type = content["type"],
            image = content["image"],
            links = links
        ))
        if cnt == (articles_per_page - 1) or i == (len(files) - 1):
            articles.append(page_articles.copy())
            page_articles.clear()
            cnt = 0
        else:
            cnt += 1

    # Create pages
    pages = []
    for i in range(number_pages):
        shutil.copy("../templates/page.html", "../profile/research/")
        source_path = "../profile/research/page.html"
        new_path = f"../profile/research/page_{i}.html"
        shutil.move(source_path, new_path)
        pages.append(new_path)

    # Render pages
    for i in range(len(articles)):
        with open("../templates/page.html", "r") as temp:
            template = Template(temp.read())
            output = template.render(page=i, pages=len(articles), max_articles=articles_per_page, articles=articles[i])
        with open(pages[i], "w") as page:
            page.write(output)

if __name__ == '__main__':
    articles_per_page = 4

    print(f"Rendering {articles_per_page} articles per page...")
    render(articles_per_page)
    print("Done!")
