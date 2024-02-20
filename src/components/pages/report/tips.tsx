export default function Tips() {
  const tips = {
    "Data Breaches":
      "Encrypt sensitive data, update software regularly, and conduct security audits.",
    "Insider Threats":
      "Implement strict access controls, conduct thorough background checks, encourage reporting, and use monitoring systems.",
    "Compliance Violations":
      "Stay updated on financial regulations, establish clear policies, and conduct regular compliance audits.",
    "Phishing Attacks":
      "Provide ongoing cybersecurity training, use advanced email filtering, and enforce multi-factor authentication.",
    "Ransomware Attacks":
      "Regularly back up critical data, educate employees on phishing risks, and implement network segmentation to contain ransomware impact.",
  };
  return (
    <div className="rounded-lg border px-3 py-2 shadow-sm">
      <h1 className="font-semibold text-gray-700">AI Tips</h1>
      <div className="space-y-1">
        {/* {Array(5)
          .fill(
            "Try to secure your credentials by using two factor authentication.",
          )
          .map((tip, index) => (
            <li
              key={index}
              className="flex space-x-1 rounded-md border px-2 py-1 text-center text-sm text-gray-700"
            >
              <p className="text-gray-400">#{index + 1} </p>
              <p>{tip}</p>
            </li>
          ))} */}
        {Object.keys(tips).map((tip, index) => (
          <div className="rounded-md border p-[6px]" key={index}>
            <h1 className="text-xs font-semibold">{tip}</h1>
            <p className="text-xs">{tips[tip as keyof typeof tips]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
