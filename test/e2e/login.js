import { Selector } from 'testcafe';


fixture`Example test`
    .page`localhost:3000`;

test('My first test', async t =>{
     await t
        .typeText('#developer-name', 'John Smith')
        .click('#submit-button')
        .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');

    const articleHeader = await Selector('.result-content').find('h1');

    // Obtain the text of the article header
    let headerText = await articleHeader.innerText;
})