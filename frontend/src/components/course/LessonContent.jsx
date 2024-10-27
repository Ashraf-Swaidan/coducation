import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import VideoComponent from './VideoComponent'; // Import the VideoComponent
import './styles/LessonContent.css'; // Custom CSS for LessonContent


const LessonContent = ({ module, lesson }) => {
    return (
        <Container className="lesson-content">
            <h2>{lesson.title}</h2>
            {lesson.sections.map((section, index) => (
                <Row key={index} className="mb-3">
                    {section.type === 'markdown' && (
                        <Col>
                            <ReactMarkdown children={section.content} remarkPlugins={[remarkGfm]}/>
                        </Col>
                    )}
                </Row>
            ))}
        </Container>
    );
};

export default LessonContent;
