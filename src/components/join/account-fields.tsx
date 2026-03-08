import {
  type JoinFormData,
  PLATFORMS,
  inputClass,
  toggleClass,
} from "@/lib/join";
import { Field } from "./field";
import { Input } from "@/components/ui/input";
import { PillarInfo } from "./pillar-info";
import { useState } from "react";

type Account = JoinFormData["accounts"][number];

type AccountFieldsProps = {
  index: number;
  account: Account;
  error?: {
    handle?: string;
    platforms?: string;
    pillar1?: string;
    pillar2?: string;
    pillar3?: string;
  };
  onChange: (index: number, updated: Account) => void;
  onRemove?: (index: number) => void;
};

export function AccountFields({
  index,
  account,
  error,
  onChange,
  onRemove,
}: AccountFieldsProps) {
  const [showPillarInfo, setShowPillarInfo] = useState(false);

  function updateHandle(value: string) {
    onChange(index, { ...account, handle: value.replace(/^@/, "") });
  }

  function updateField(field: keyof Account, value: string) {
    onChange(index, { ...account, [field]: value });
  }

  function togglePlatform(platform: string) {
    const platforms = account.platforms.includes(platform)
      ? account.platforms.filter((p) => p !== platform)
      : [...account.platforms, platform];
    onChange(index, { ...account, platforms });
  }

  return (
    <div className="space-y-4 border border-border p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          Account {index + 1}
        </p>
        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-xs tracking-widest uppercase text-red-500 hover:text-red-400 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <Field label="Social Handle" error={error?.handle} required={index === 0}>
        <Input
          placeholder="@yourhandle"
          value={account.handle}
          onChange={(e) => updateHandle(e.target.value)}
          className={inputClass(!!error?.handle)}
        />
      </Field>

      <Field
        label="Platform(s)"
        error={error?.platforms}
        required={index === 0}
      >
        <div className="grid grid-cols-3 gap-2">
          {PLATFORMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => togglePlatform(label)}
              className={toggleClass(account.platforms.includes(label))}
            >
              <Icon className="mx-auto mb-1 text-base" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </Field>

      <PillarInfo
        showPillarInfo={showPillarInfo}
        setShowPillarInfo={setShowPillarInfo}
      />

      <Field label="Pillar 1" error={error?.pillar1} required={index === 0}>
        <Input
          placeholder="e.g. Editing Tutorials"
          value={account.pillar1}
          onChange={(e) => updateField("pillar1", e.target.value)}
          className={inputClass(!!error?.pillar1)}
        />
      </Field>

      <Field label="Pillar 2 (optional)">
        <Input
          placeholder="e.g. Client Projects"
          value={account.pillar2 ?? ""}
          onChange={(e) => updateField("pillar2", e.target.value)}
          className={inputClass(false)}
        />
      </Field>

      <Field label="Pillar 3 (optional)">
        <Input
          placeholder="e.g. Content Strategy Tips"
          value={account.pillar3 ?? ""}
          onChange={(e) => updateField("pillar3", e.target.value)}
          className={inputClass(false)}
        />
      </Field>
    </div>
  );
}
