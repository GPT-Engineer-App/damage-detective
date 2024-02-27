import React, { useState } from "react";
import { Box, Button, Container, Flex, Image, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FaCamera, FaUpload } from "react-icons/fa";

const Index = () => {
  const [images, setImages] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
  };

  const handleSubmit = () => {
    // This is where you would normally make an API call for analysis
    // Mocked analysis result
    const mockedAnalysis = images.map((image, index) => ({
      image: image,
      damage: `Damage Type ${index + 1}`,
      room: `Room Classification ${index + 1}`,
    }));
    setAnalysisResult(mockedAnalysis);
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Property Damage Claim Analysis
        </Text>
        <Flex>
          <Input type="file" multiple accept="image/*" onChange={handleImageChange} hidden id="file-upload" />
          <label htmlFor="file-upload">
            <Button leftIcon={<FaCamera />} colorScheme="teal" as="span">
              Upload Images
            </Button>
          </label>
        </Flex>
        <SimpleGrid columns={3} spacing={4}>
          {images.map((image, index) => (
            <Image key={index} src={image} alt="Uploaded image" boxSize="150px" objectFit="cover" />
          ))}
        </SimpleGrid>
        <Button leftIcon={<FaUpload />} colorScheme="blue" onClick={handleSubmit} isDisabled={!images.length}>
          Analyze Damage
        </Button>
      </VStack>
      {analysisResult && (
        <Box mt={10}>
          <Text fontSize="lg" fontWeight="semibold">
            Analysis Results:
          </Text>
          <SimpleGrid columns={2} spacing={4} mt={4}>
            {analysisResult.map((result, index) => (
              <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Image src={result.image} alt={`Damage ${index + 1}`} boxSize="100px" objectFit="cover" />
                <Text mt={2}>Damage Detected: {result.damage}</Text>
                <Text>Room: {result.room}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Container>
  );
};

export default Index;
