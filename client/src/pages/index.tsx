import React from "react";
import { NavBar } from "../components/NavBar";
import { Flex, Text, Button, Box, Image, Heading } from "@chakra-ui/core";
import { GiBookshelf } from "react-icons/gi";
import { AiFillExperiment } from "react-icons/ai";
import { FaBookReader } from "react-icons/fa";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";
interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const router = useRouter();
  return (
    <>
      <NavBar />
      <Flex align="center" justify="space-evenly" m="3rem">
        <Flex m="4rem" direction="column">
          <Heading
            color="teal.400"
            fontSize="4rem"
            m="1rem"
            fontWeight="bold"
            lineHeight="5rem"
          >
            The Platform <br />
            For Readers
          </Heading>
          <Button
            fontSize="1.3rem"
            bg="white"
            width="12rem"
            height="3rem"
            m="0 1rem"
            fontWeight="normal"
            cursor="pointer"
            border="2px solid #6d9a7f"
            _hover={{ bg: "teal.400", color: "white" }}
          >
            Get Started
          </Button>
        </Flex>
        <Image
          src="/book.svg"
          alt="illustration of someone reading on top of a pile of books with a plant in the corner"
          // width="90rem"
          size="30rem"
          margin="3rem"
        />
      </Flex>
      <Flex
        justify="center"
        align="center"
        direction="column"
        bg="#d9d9d9"
        p="6rem"
        fontSize="1.2rem"
        textAlign="center"
      >
        <Text width="40rem">
          Whether you are looking to further your reading habits, or build upon
          an existing habit, the right technolgy can make all the difference.
        </Text>
        <Text width="40rem">
          At BetterReads, we combine in-depth data science with a friendly, easy
          to navigate application to provide a robust, never before seen
          experience!
        </Text>
      </Flex>
      <Flex
        justify="center"
        align="center"
        m="5rem"
        textAlign="center"
        color="whitesmoke"
      >
        <Flex
          bg="teal.400"
          direction="column"
          m="2rem"
          p="1.5rem"
          borderRadius=".5rem"
          width="33%"
          align="center"
        >
          <Box as={GiBookshelf} mb="1rem" size="2rem" />
          <Text fontWeight="bold" fontSize="1.2rem" m="0">
            Endless Library
          </Text>
          <Text lineHeight="1.4rem">
            With our library of over 100,000 books, we are confident you will be
            able to find books just for you! Future updates will aim to provide
            an even more diverse selection of books!
          </Text>
        </Flex>
        <Flex
          bg="#6d9a7f"
          direction="column"
          m="2rem"
          p="1.5rem"
          borderRadius=".5rem"
          width="33%"
          align="center"
        >
          <Box as={AiFillExperiment} mb="1rem" size="2rem" />
          <Text fontWeight="bold" fontSize="1.2rem" m="0">
            Tailored Recommendations
          </Text>
          <Text lineHeight="1.4rem">
            Our recommendation engine is the heart of our application. Our main
            goal is to assist you in expanding your libraries by providing
            useful and insightful recommendations tailored to your interests.
          </Text>
        </Flex>
        <Flex
          bg="teal.400"
          direction="column"
          m="2rem"
          p="1.5rem"
          borderRadius=".5rem"
          width="33%"
          align="center"
        >
          <Box as={FaBookReader} mb="1rem" size="2rem" />
          <Text fontWeight="bold" fontSize="1.2rem" m="0">
            Custom Libraries
          </Text>
          <Text lineHeight="1.4rem">
            With custom shelves and user libraries, you have the power to curate
            your personalized selection of books in a way you feel relevant
            while also receiving custom recommendations.
          </Text>
        </Flex>
      </Flex>
      <Flex mt="8rem" justify="center" align="center">
        <Flex direction="column">
          <Text fontSize="2rem" m="1rem">
            Start your journey with BetterReads today!
          </Text>
          <Button
            fontSize="1.3rem"
            bg="white"
            width="12rem"
            height="3rem"
            m="0 1rem"
            fontWeight="normal"
            cursor="pointer"
            border="2px solid #6d9a7f"
            _hover={{ bg: "#6d9a7f", color: "white" }}
            onClick={() => router.push("/register")}
          >
            Register Now
          </Button>
        </Flex>

        <Image
          src="/reading.svg"
          alt="illustration of someone reading a book under a lamp"
          width="600"
        />
      </Flex>
      <Flex justify="center" bg="#d9d9d9" m="0" p="1rem">
        <Text>BetterReads 2020</Text>
      </Flex>
    </>
  );
};

export default withApollo({ ssr: true })(Index);
