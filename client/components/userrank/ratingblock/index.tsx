import React from 'react';
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  useMantineTheme
} from '@mantine/core';
import image from './image.svg';
import getRating from './RatingAssigner';
import CountUp from 'react-countup';
import { commitStatSentence, followersStatSentence, starsStatSentence } from './StatSentences';

const ranking = (level) => {
  // Beginner status as fallback
  let obj = {
    title: 'Beginner',
    description: 'You have not yet achieved any rank.',
    color: 'blue'
  }

  // Ultimate status
  if (level === 7) {
    obj = {
      title: 'Ultimate',
      description: 'You have achieved the highest rank.',
      color: 'gold'
    }
  }

  // Legendary status
  if (level >= 6) {
    obj = {
      title: 'Legendary',
      description: 'Legend',
      color: 'yellow'
    }
  }

  // Pro status
  if (level >= 4) {
    obj = {
      title: 'Legendary',
      description: 'Legend',
      color: 'green'
    }
  }


  // Intermediate status
  if (level >= 2) {
    obj = {
      title: 'Intermediate',
      description: 'Legend',
      color: '#38D9A9'
    }
  }

  return obj;
}

const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
    },
  
    content: {
      maxWidth: 480,
      marginRight: theme.spacing.xl * 3,
  
      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontSize: 44,
      lineHeight: 1.2,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: 28,
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },
  
    image: {
      flex: 1,
  
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },
  
    highlight: {
      position: 'relative',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
          : theme.colors[theme.primaryColor][0],
      borderRadius: theme.radius.sm,
      padding: '4px 12px',
    },
  }));

export function RatingBlock({ level, commits, followers, stars }) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const rating = getRating(level);
    return (
        <div style={{background:  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]}}>
          <Container className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                {rating.before} <span className={classes.highlight} style={{background: theme.fn.rgba(rating.color, 0.5)}}>{rating.title.toLowerCase()}</span> <br /> {rating.after}
              </Title>
              <Text color="dimmed" mt="md">
                {rating.description}
              </Text>
  
              <List
                mt={30}
                spacing="sm"
                size="sm"
              >
                <List.Item icon="📨">
                  <b><CountUp end={commits}></CountUp> commits this year</b> – {commitStatSentence(commits)}
                </List.Item>
                <List.Item icon="⭐">
                  <b><CountUp end={stars}></CountUp> stars earned</b> – {starsStatSentence(stars)}
                </List.Item>
                <List.Item icon="👩‍💻"> 
                  <b><CountUp end={followers}></CountUp> followers</b> – {followersStatSentence(followers)}
                </List.Item>
              </List>
  
            </div>
            <Image src={image.src} className={classes.image} alt=""/>
        </Container>
        </div>
    );
}