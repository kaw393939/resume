import { test, expect } from '@playwright/test';

test('ensure my-skills section is present', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Ensure the section with the class 'my-skills' is present
  const mySkillsSection = await page.$('section.my-skills');
  expect(mySkillsSection).not.toBeNull();

  // Ensure that all expected headings are present within the 'my-skills' section
  const headings = [
    'Software Development & Architecture',
    'Emerging Technologies',
    'Cloud & DevOps',
    'Database Management',
    'Project Management & Leadership',
    'Business Strategy & Innovation',
    'Education & Communication'
  ];

  for (const heading of headings) {
    const headingElement = await page.getByRole('heading', { name: heading });
    expect(await headingElement.isVisible()).toBeTruthy();
  }

  // Optionally, ensure specific content within the section is present
  const specificContentSelectors = [
    'text=Full-Stack Development (PHP, Java, JavaScript, Python)',
    'text=Generative AI & Large Language Models',
    'text=Docker & Containerization',
    'text=SQL (MySQL, PostgreSQL)',
    'text=Agile & Scrum Methodologies',
    'text=Product Development & Management',
    'text=Curriculum Development'
  ];

  for (const selector of specificContentSelectors) {
    const contentElement = await page.$(selector);
    expect(contentElement).not.toBeNull();
  }
});
