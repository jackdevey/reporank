import React, { useState } from 'react';
import { Button, Card, Container, TextInput, AppShell, LoadingOverlay, useMantineTheme, Modal, Accordion, Text, Code, Anchor, Grid, GroupedTransition, Group, Title } from '@mantine/core';
import { PersonIcon, RepoIcon } from '@primer/octicons-react';
import { BackgroundStyle, CompactLineStyle } from '../misc/style/Style'
import { Tabs } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { ShowErrorPopup } from '../misc/ShowErrorPopup.js';
import { User } from '../misc/user/User.js';
import Head from 'next/head';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer';

export default function IndexPage() {

  const empty = {
    score: "Unknown",
    level: "Unknown",
    status: {
      title: "Unknown",
      color: "grey"
    },
    breakdown: {
      stars: "Unknown",
      forks: "Unknown",
      openIssues: "Unknown",
      codeChange: "Unknown",
      community: "Unknown"
    }
  }

  const theme = useMantineTheme();

  const [title, setTitle] = useState('RepoRank');

  const [username, setUsername] = useState('');
  const modals = useModals();

  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [result, setResult] = useState(empty);

  const [loading, setLoading] = useState(false);

  let endpoint = "https://api.reporank.dev";

  if (process.env.NODE_ENV !== 'production') {
    endpoint = "http://localhost:8080";
  }

  return (
    <>
      <Head><title>{title}</title></Head>
      <Header title={"RepoRank"} page={"home"}/>
      <Container mt={15} mb={15}>

      <Group spacing={15}>
        <Title order={1}>🔥</Title>
          <div>
            <Title order={2}>RepoRank</Title>
            <Text>Calculating scores for the performance of GitHub repositories</Text>
          </div>
        </Group>

        <Card mt={10} mb={10}>
          <LoadingOverlay visible={loading} />

          <Tabs defaultValue='repos'>
            <Tabs.List>
              <Tabs.Tab value='repos'>Repositories</Tabs.Tab>
              <Tabs.Tab value='users'>Users</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='repos'>
              <TextInput
                placeholder="Owner"
                size="xl"
                value={owner}
                onChange={e => setOwner(e.target.value)}
                icon={<PersonIcon size={24} />}
                style={{ paddingBottom: "20px", paddingTop: "10px" }}
                variant="filled"
                required
              />
              <TextInput
                placeholder="Repository"
                size="xl"
                value={repo}
                onChange={e => setRepo(e.target.value)}
                icon={<RepoIcon size={24} />}
                style={{ paddingBottom: "20px" }}
                variant="filled"
                required
              />
              <Button
                variant="light"
                size="xl"
                onClick={Click}>
                Calculate
              </Button>
            </Tabs.Panel>

            <Tabs.Panel value='users'>
              <TextInput
                placeholder="Username"
                size="xl"
                value={username}
                onChange={e => setUsername(e.target.value)}
                icon={<PersonIcon size={24} />}
                style={{ paddingBottom: "20px", paddingTop: "10px" }}
                variant="filled"
                required
              />
              <Button
                variant="light"
                onClick={FetchUserReport}>
                Calculate
              </Button>

              <Button
                ml="md"
                onClick={ForwardToReport}
                >
                *NEW* Make Report
              </Button>
            </Tabs.Panel>
          </Tabs>
        </Card>      
      </Container>
      <Footer/>

      <Modal
        centered
        opened={result.score !== "Unknown"}
        onClose={() => setResult(empty)}
        title={`${owner}/${repo}`}>

        <h1
          style={CompactLineStyle()}>
          ✨ {result.score} <small>pts</small>
        </h1>

        <h3 style={CompactLineStyle()}>🏅 Level {result.level}</h3>

        <Text style={{ marginTop: "20px", marginBottom: "20px" }}>
          This means <Anchor href={`https://github.com/${owner}/${repo}`} target="_blank">{owner}/{repo}</Anchor> has recieved the <Code color={result.status.color}>{result.status.title}</Code> status from RepoRate
        </Text >

        <h3 style={CompactLineStyle()}>Score breakdown</h3>

        <Accordion variant="separated">
          <Accordion.Item value="community">
            <Accordion.Control>Community 💞</Accordion.Control>
            <Accordion.Panel>The repo has a community percentage of <Code>{result.breakdown.community}%</Code></Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="activity">
            <Accordion.Control>Activity 👩‍💻</Accordion.Control>
            <Accordion.Panel>The repo has a code change value of <Code>{result.breakdown.codeChange}</Code></Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="stars">
            <Accordion.Control>Stars 🌟</Accordion.Control>
            <Accordion.Panel>The repo has <Code>{result.breakdown.stars}</Code> stars</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="forks">
            <Accordion.Control>Forks 🍴</Accordion.Control>
            <Accordion.Panel>The repo has <Code>{result.breakdown.forks}</Code> forks</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="oissues">
            <Accordion.Control>Open issues 🚨</Accordion.Control>
            <Accordion.Panel>The repo has <Code>{result.breakdown.openIssues}</Code> open issues</Accordion.Panel>
          </Accordion.Item>
        </Accordion>

      </Modal>
    </>
  );

  function Click() {

    if (owner === '' || repo === '') {
      ShowErrorPopup(modals, {
        code: 400,
        message: "You didn't even enter anything!"
      }, "repo");
      return;
    }

    setLoading(true);

    fetch(`${endpoint}/${owner}/${repo}`)
      .then(res => res.json())
      .then((data) => {
        setLoading(false);
        setResult(data.body);
      })

  };

  function FetchUserReport() {
    User(React, modals, username, (bool) => setLoading(bool))
  }

  function ForwardToReport() {
    if (username === '') {
      ShowErrorPopup(modals, {
        code: 400,
        message: "You didn't even enter anything!"
      }, "repo");
      return;
    }

    window.location.href = `/reports/${username}`;
  }

}

function pageLoading() {
  return (
    <>
      <Head><title>RepoRank</title></Head>
      <LoadingOverlay visible={true} />
    </>
  )
}