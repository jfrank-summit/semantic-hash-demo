import { OpenAIEmbeddings } from '@langchain/openai';
import { lsh } from './lsh';

require('dotenv').config();

const main = async () => {
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY, // Use the API key from your .env file
    });
    /* Embed queries */
    const res1 = await embeddings.embedQuery('I am Lost in the woods');
    const res2 = await embeddings.embedQuery('I am going to throw rocks today');
    const res3 = await embeddings.embedQuery(
        'I am going to throw stones today'
    );

    const myLsh = lsh(1536, 20);
    myLsh.addPoint(res1);
    myLsh.addPoint(res2);
    myLsh.addPoint(res3);

    const queryPoint = res2;
    console.log(myLsh.getBuckets());
    console.log('query', queryPoint);
};

main().catch(console.error);
