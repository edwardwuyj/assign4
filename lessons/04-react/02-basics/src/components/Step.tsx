type StepProps = {
  title: string;
  children: React.ReactNode;
  renderExtra?: () => React.ReactNode;
};

export const Step = ({ title, children, renderExtra }: StepProps) => (
  <div className="my-4 rounded-lg border border-gray-300 p-4">
    <h2 className="mb-4 text-2xl font-semibold text-blue-600">{title}</h2>
    {children}
    {renderExtra && <div className="mt-4 rounded-md bg-gray-100 p-3">{renderExtra()}</div>}
  </div>
);
