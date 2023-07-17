import {FormEvent, useCallback, useState} from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Text,
  Input,
} from '@chakra-ui/react';
import UrlList from './url-list';
import { Shortened } from './types';
import ErrorPopup from './popup';

type ShortenUrlFormProps = {
  requestShortUrl: (original: string) => Promise<void>;
};

export const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({
                                                                requestShortUrl,
                                                              }) => {
  const [inputUrl, setInputUrl] = useState<string>('');
  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      await requestShortUrl(inputUrl);
      setInputUrl('');
    },
    [inputUrl, setInputUrl]
  );
  return (
    <form onSubmit={onSubmit}>
      <Input
        id="url-input"
        size="lg"
        marginBlock={4}
        value={inputUrl}
        onChange={(e) => {
          setInputUrl(e.target.value);
        }}
        placeholder="www.my-super-long-url-here.com/12345"
      />
      <Button id="submit-btn" type="submit" colorScheme="purple" size="lg">
        Generate
      </Button>
    </form>
  );
};


export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);
  const [isNewUrl, setIsNewUrl] = useState(true);
  const requestShortUrl = useCallback(
    async (inputUrl: string) => {
      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });
      const newUrl = response.data as Shortened;
      const shortUrl = `${newUrl.short}`;
      //converting the shortened url into a string to check its contents
      if (shortUrl !== "invalid") {
        setUrls([newUrl, ...urls]);
        setIsNewUrl(true);
      } else {
        setIsNewUrl(false);
      }
    },
    [urls, setUrls]
  );

  // if there is no new url to be displayed because the inputted url was invalid, the error popup occurs
  // otherwise, the new shortened and inputted url are displayed
  return (
    <Container maxWidth="4xl" marginBlock={10} textAlign="center">
      <Text fontFamily = "Algerian" fontSize="4xl">My URL Shortener</Text>
      <p>Type in a URL to get started :)</p>
      <ShortenUrlForm requestShortUrl={requestShortUrl}/>
      { !isNewUrl && <ErrorPopup />}
      <UrlList urls={urls}/>
    </Container>
  );
}
export default App;
