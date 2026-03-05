import {
  type JoinFormData,
  PLATFORMS,
  inputClass,
  toggleClass,
} from "@/lib/join";
import { Field } from "./field";
import { Input } from "@/components/ui/input";

type Account = JoinFormData["accounts"][number];

type AccountFieldsProps = {
  index: number;
  account: Account;
  error?: { handle?: string; platforms?: string };
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
  function updateHandle(value: string) {
    onChange(index, { ...account, handle: value.replace(/^@/, "") });
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
    </div>
  );
}
