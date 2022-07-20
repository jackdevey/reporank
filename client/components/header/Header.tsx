import React, { useState } from 'react';
import { createStyles, Header as MTHeader, Group, ActionIcon, Container, Burger, Title } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  }
}));

export function Header({ title = "RepoRank", children }) {
  const { classes } = useStyles();
  const [_title, setTitle] = useState(title);

  return (
    <MTHeader height={56}>
      <Container className={classes.inner}>
        <Title order={3} onMouseEnter={() => setTitle("RepoRank")} onMouseLeave={() => setTitle(title)}>🔥{_title}</Title>
        <Group spacing={0} className={classes.social} position="right" noWrap>
          {children}
        </Group>
      </Container>
    </MTHeader>
  );
}