from camoufox.sync_api import Camoufox
import json
import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()



server = os.getenv("SERVER")
username = os.getenv("USERNAME")
password = os.getenv("PASSWORD")


config = {
    "window.outerHeight": 1056,
    "window.outerWidth": 1920,
    "window.innerHeight": 1008,
    "window.innerWidth": 1920,
    "window.history.length": 4,
    "navigator.userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
    "navigator.appCodeName": "Mozilla",
    "navigator.appName": "Netscape",
    "navigator.appVersion": "5.0 (Windows)",
    "navigator.oscpu": "Windows NT 10.0; Win64; x64",
    "navigator.language": "en-US",
    "navigator.languages": ["en-US"],
    "navigator.platform": "Win32",
    "navigator.hardwareConcurrency": 12,
    "navigator.product": "Gecko",
    "navigator.productSub": "20030107",
    "navigator.maxTouchPoints": 10,
}


def scrape_linkedin_profile(url):
    with Camoufox(
        headless=False,
        persistent_context=True,
        user_data_dir="user-data-dir",
        os=["windows", "macos", "linux"],
        config=config,
        i_know_what_im_doing=True,
        geoip=True,
        proxy={
            "server": server,
            "username": username,
            "password": password,
        },
    ) as browser:
        page = browser.new_page()
        # page.goto("https://www.linkedin.com/login")

        # page.wait_for_timeout(10000)
        # page.query_selector("#username").fill("prarthanaaa.2012@gmail.com")  # TODO: add your email
        # page.query_selector("#password").fill("Prarthana12#")                # TODO: add your password
        # page.click(".btn__primary--large")
        
        # page.wait_for_timeout(5000)
        profile = {}
        page.goto(url)
        page.wait_for_timeout(5000)
        # scroll down
        page.evaluate(
            """
                window.scrollTo(0, document.body.scrollHeight);
                """
        )
        # start
        name = page.locator("h1.break-words").inner_text()
        headline = page.locator("div.text-body-medium").inner_text()
        profilePicture = page.locator(
            "img[title='{}']".format(name.strip())
        ).get_attribute("src")
        location = page.locator(
            "span.text-body-small.inline.t-black--light"
        ).inner_text()
        about_me_description = " ".join(
            page.locator(
                "div.inline-show-more-text--is-collapsed.inline-show-more-text--is-collapsed-with-line-clamp.full-width"
            ).all_inner_texts()
        )

        # experience
        page.goto("{}/details/experience/".format(url))
        page.wait_for_timeout(5000)

        experiences = page.locator("li.pvs-list__paged-list-item")
        experience_count = experiences.count()
        all_experiences = []
        description = ""

        for i in range(experience_count):
            exp = experiences.nth(i)

            try:
                job_title = exp.locator(
                    "div.t-bold span[aria-hidden='true']"
                ).inner_text()
                company_and_type = exp.locator("span.t-14.t-normal").nth(0).inner_text()
                date_range = (
                    exp.locator("span.t-14.t-normal.t-black--light").nth(0).inner_text()
                )
                location = (
                    exp.locator("span.t-14.t-normal.t-black--light").nth(1).inner_text()
                )

                if exp.locator(".pvs-entity__sub-components").count() > 0:
                    description = exp.locator(
                        ".pvs-entity__sub-components"
                    ).inner_text()

            except:
                company_and_type = ""

            start_date = ""
            end_date = ""
            if date_range:
                if "·" in date_range:
                    date_range = date_range.split("·")[0].strip()
                if date_range:
                    start_date = date_range.split("-")[0].strip()
                    end_date = date_range.split("-")[1].strip()

            all_experiences.append(
                {
                    "title": job_title.strip(),
                    "company": company_and_type.strip(),
                    "start_date": start_date,
                    "end_date": end_date,
                    "location": location.strip(),
                    "description": description,
                }
            )

        # education
        education = []
        page.goto("{}/details/education/".format(url))
        page.wait_for_timeout(5000)
        education_blocks = page.locator("li.pvs-list__paged-list-item")

        for i in range(education_blocks.count()):
            block = education_blocks.nth(i)
            school_name = block.locator("span[aria-hidden='true']").nth(0).inner_text()
            degree = block.locator("span[aria-hidden='true']").nth(1).inner_text()
            years = block.locator("span[aria-hidden='true']").nth(2).inner_text()
            print(f"{school_name} | {degree} | {years}")
            education.append(
                {
                    "school_name": school_name.strip(),
                    "degree": degree.strip(),
                    "years": years.strip(),
                }
            )

        page.goto("{}/details/skills/".format(url))
        page.wait_for_timeout(5000)
        skills = (
            page.locator("a[data-field='skill_page_skill_topic']")
            .locator("span.visually-hidden")
            .all_inner_texts()
        )
        profile["name"] = name
        profile["profilePicture"] = profilePicture
        profile["experience"] = all_experiences
        profile["education"] = education
        profile["skills"] = skills
        profile["contactInfo"] = {"linkedin": url}
        profile["location"] = location
        profile["about_me_description"] = about_me_description
        profile["headline"] = headline
        page.close()
        # dump into a file into frontned
        with open("../frontend/src/dummy.json", "w", encoding="utf-8") as f:
            json.dump(profile, f, ensure_ascii=False, indent=2)

        return profile

# scrape_linkedin_profile("https://www.linkedin.com/in/aakankshamirdha")
