import { OpenAIEmbeddings } from '@langchain/openai';
import { lsh } from './lsh';

require('dotenv').config();

const main = async () => {
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY, // Use the API key from your .env file
    });
    /* Embed queries */
    const res1 = await embeddings.embedQuery(
        'Artificial intelligence (AI) is revolutionizing the healthcare industry by enhancing diagnostic accuracy, personalizing treatment plans, and streamlining administrative tasks. Through the application of sophisticated algorithms and machine learning techniques, AI systems can analyze vast amounts of medical data at unprecedented speeds, identifying patterns that might elude human experts. This capability is particularly transformative in the realm of diagnostics, where AI-powered tools can detect diseases such as cancer and diabetes much earlier than traditional methods. Furthermore, AI is facilitating the development of personalized medicine, enabling treatments to be tailored to the genetic makeup of individual patients, thereby improving outcomes and reducing side effects. The automation of administrative tasks by AI not only saves time but also reduces the potential for human error, contributing to more efficient and effective healthcare delivery.'
    );
    const res2 = await embeddings.embedQuery(
        'The advent of artificial intelligence in healthcare is marking a new era in how medical services are delivered and managed. AI technologies are at the forefront of improving the precision of diagnoses, customizing patient care, and optimizing operational efficiencies. Leveraging deep learning and data analytics, AI solutions are capable of sifting through extensive medical records quickly to uncover insights that help in early disease detection, such as identifying early stages of cancer or predicting diabetes risk. These innovations pave the way for treatments that are specifically designed based on a patients unique genetic profile, enhancing treatment efficacy and minimizing adverse reactions. Additionally, AI-driven automation in healthcare administration significantly reduces paperwork, minimizes errors, and facilitates smoother patient care processes.'
    );
    const res3 = await embeddings.embedQuery(
        'In the realm of urban planning, the concept of green spaces has emerged as a pivotal element in fostering sustainable and livable cities. Green spaces, including parks, gardens, and natural landscapes, are not merely aesthetic enhancements but serve critical ecological functions. They act as urban lungs, improving air quality by absorbing pollutants and producing oxygen, mitigating the urban heat island effect by providing shade and cooling areas, and enhancing biodiversity by offering habitats for various species. Moreover, these spaces offer residents a refuge from the hustle and bustle of city life, promoting physical health through recreational activities and mental well-being by providing serene environments. As cities continue to grow, integrating green spaces into urban development plans is becoming increasingly vital for ensuring the health and happiness of urban populations.'
    );

    const myLsh = lsh(1536, 10);
    myLsh.addPoint(res1);
    myLsh.addPoint(res2);
    myLsh.addPoint(res3);
};

main().catch(console.error);
