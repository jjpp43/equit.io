# Learn with Ease : Dyslexia-Friendly Tool



## Inspiration

Struggling to read can have long-term consequences. According to [Yale Center of Dyslexia & Creativity](https://dyslexia.yale.edu/dyslexia/dyslexia-faq/), dyslexia affects **20%** of the population and accounts for the majority of learning disabilities. An estimated **62%** of students with reading difficulties drop out of high school.
We wanted to create a tool that makes reading easier, clearer, and more empowering for those with dyslexia — all with a click.<br>
![Dyslexia Simulator](https://raw.githubusercontent.com/jjpp43/equit.io/refs/heads/main/equitio/public/dyslexia-min.gif)

## What it does

Equit.IO is an web app that converts regular text into a dyslexia-friendly format. It transforms **fonts**, **adjusts spacing**, and improves **readability** to reduce **cognitive load** for users with dyslexia.

## Key Features

- **Dyslexia-Friendly Design** : Follows the [British Dyslexia Association's style guide](https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide) for better readability.
- **Enhanced Readability**: Convert text in a PDF to a well-supported Dyslexia accessible and legible font.
- **Reading Level Adjustment**: Seamlessly change the reading level of the processed text.
- **Concise Summarization**: Quickly read a summary of the processed document.
- **Text-To-Speech Capabilities**: Easily listen to an audio recording of the processed text or summary, no downloads required.

## What's next for Equit.IO

### The main step forward would be improving the **User Experience**:

- We plan to implement functionality in which users can create an account with EquitIO. This would allow for memory retention of the model, which would be huge for the project.
  -- Users would be able to **revisit** past documents, allowing them to **repeatedly** and **efficiently** interpret class assignments and articles.
- People with dyslexia often use **color-guided strips** for reading support. We also plan to implement a **highlighting** feature, which will make text even more legible and accessible for users with dyslexia.

## How we built it

- **Frontend**: Built with Next.js, Tailwind CSS, and shadcn/ui for a responsive and accessible user interface.
- **Backend**: PDF parsing & refining. AI functionality powered by **OpenAI API model GPT 3.5-Turbo**
- **Design**: Clean & Simple UI for users with dyslexia.

## Challenges we ran into

- Fine-tuning the **GPT 3.5-Turbo** model was difficult at first. Although quite cost effective, when **untrained** the model proves to be **extremely generic** and sometimes difficult to understand
- Implementing the core functionality of our software, **file-uploading** and **text extraction**. Storing the data of processed documents, and passing raw text to the OpenAI API.

## Accomplishments that we're proud of

In a mere **team of two**, we are extremely proud of our finished product. But to be more specific, we love how:

- Users are able to **adjust** the **reading level** of the output-text with just the click of a radio button! We were extremely proud of ourselves when this feature worked for the first time. In 2025, we have all been desensitized by the power of AI (primarily through ChatGPT), so it was awesome to see a model we trained output actual results.
- Integrating **Text To Speech** features, with an extremely realistic and tone-varying voice. This not only boosts the effectiveness of the app, but also it's practicality. No one wants to listen to something they don't understand!

## What we learned

Besides sharpening our skills in frontend development, the two of us learned:

- The **significance** of a properly tuned AI model for **real-world applications**.
- How to **prompt**, and more importantly, **store** files as input from the user
- How to **parse** through said files, grabbing the main content along with meta data
- How to **dynamically-adjust** an AI model's responses. Speaking in terms of front-end, through the state of buttons/forms. In terms of back-end, through the variables assigned to said buttons/forms.

## Impact and Market Fit

- Equit.IO could be transformed into a **browser extension**, making the tool increasingly more **accessible**- acting as a plugin in which students could instantly refine and summarize any text (assignments, articles, etc).
- Although our immediate audience includes **any student** K-12 and beyond, Equit.IO could be offered as a **subscription model** for parents, tutors, and accessibility-focused organizations, increasing our market potential **tremendously**.
