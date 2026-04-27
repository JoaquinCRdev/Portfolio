import { MarkdownSection } from '../../components/markdown/markdownSection';

const AboutPage = () => {
  return (
    <div className="h-full min-h-0 w-full flex justify-center">
      <div className="w-full max-w-4xl h-full min-h-0 overflow-y-auto px-6 py-8">
        <MarkdownSection filePath="about.md" />
      </div>
    </div>
  );
};

export default AboutPage;