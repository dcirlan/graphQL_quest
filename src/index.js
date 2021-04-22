import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';
import './index.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

const LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  );
}

function Launches() {
  const { loading, error, data } = useQuery(LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    console.log(data);

    return data.launches.map(({ details, rocket, links, launch_success, launch_date_utc }) => (
      <div key={details}>
        <p>
          {rocket.rocket_name} / {launch_date_utc} - {launch_success}
        </p>
        <p>
          {details}
        </p>
        <p>
          {links.video_link}
        </p>
      </div>
  ));
}

render(
  <ApolloProvider client={client}>
    <App />
    <Launches />
  </ApolloProvider>,
  document.getElementById('root'),
);



 /* import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';
import './index.css';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

const EXCHANGE_RATES = gql`
    query GetExchangeRates {
        launches(limit: 5) {
            launch_date_utc
            launch_success
            rocket {
                rocket_name
            }
            links {
                video_link
            }
            details
        }
    }
`;


function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    console.log(data);

  return data.launches.map(({ details, rocket }) => (
    <div key={details}>
      <p>
        {rocket.rocket_name}
      </p>
    </div>
  ));
}

function App() {
    return (
      <div>
        <h2>My first Apollo app 🚀</h2>
      </div>
    );
  }
  

  render(
    <ApolloProvider client={client}>
      <App />
      <ExchangeRates />
    </ApolloProvider>,
    document.getElementById('root'),
  ); */