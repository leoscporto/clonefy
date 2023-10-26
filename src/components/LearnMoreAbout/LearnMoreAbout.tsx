import { FaInfoCircle } from "react-icons/fa";

interface LearnMoreAboutProps {
  normalText: string;
  underlinedText: string;
  link?: string;
}

const LearnMoreAbout: React.FC<LearnMoreAboutProps> = ({
  normalText,
  underlinedText,
  link,
}) => {
  return (
    <div className="text-center py-4">
      <FaInfoCircle className="inline-block text-blue-500 mr-1" />
      <p className="inline-block">
        {normalText}{" "}
        <a href={link} className="underline text-blue-600">
          {underlinedText}
        </a>
      </p>
    </div>
  );
};

export default LearnMoreAbout;
