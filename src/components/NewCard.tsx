import { Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";

interface NewCardProps {
  width?: string;
  height?: string;
}

export default function NewCard({
  width = "w-80",
  height = "h-40",
}: NewCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`${width} ${height} flex items-center justify-center border-2 border-dashed border-textSecondary-dark light:border-textSecondary-light rounded-lg cursor-pointer hover:border-primary-dark light:hover:border-primary-light transition-all`}
      onClick={() => navigate("/groups/create")}
    >
      <Plus
        size={40}
        className="text-textSecondary-dark light:text-textSecondary-light"
      />
    </div>
  );
}
