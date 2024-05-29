import puppeteer from "puppeteer";

const getJobs = async () => {
    const browser = await puppeteer.launch({
        product:'firefox',
        headless: false,
        defaultViewport: null,
        executablePath: '/home/mojo/.cache/puppeteer/firefox/linux-nightly_128.0a1/firefox/firefox',
    });

    const page = await browser.newPage();

    await page.goto("https://www.linkedin.com/jobs/collections/",{
        waitUntil: "domcontentloaded",
    });

    const jobs = await page.evaluate(() => {
        const job = document.querySelector(".job-card-container")
        const role = job.querySelector(".job-card-list__title > span > strong").innerText;
        const company = job.querySelector(".artdeco-entity-lockup__subtitle > span").innerText;
        const location = job.querySelector(".artdeco-entity-lockup > .job-card-container__metadata-wrapper > .job-card-container__metadata-item").innerText;

        return {role, company, location}
    })

    console.log(jobs);


};

getJobs();