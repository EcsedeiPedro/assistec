type Props = {
  companies: {
    id: string;
    name: string;
  }[];
};

export function CompanyTable({ companies }: Props) {
  return (
    <div className="border rounded-md">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Nome</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className="border-b">
              <td className="p-3">{company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
