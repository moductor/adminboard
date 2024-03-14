import { PartialDeep } from "type-fest";

export type PermissionsBase = {
  users: {
    list: boolean;
    create: boolean;
    delete: boolean;
    update: boolean;
  };
};

export type Permissions = PartialDeep<PermissionsBase>;

export type PermissionKey = RecursiveKeyOf<PermissionsBase>;

export const defaultPermissions: PermissionsBase = {
  users: {
    list: true,
    create: false,
    delete: false,
    update: false,
  },
};

export function getPermissionFromGivenData(
  permissions: Permissions,
  key: PermissionKey,
) {
  const keys = key.split(".");

  let currentValue = permissions as any;
  let currentKey;
  while ((currentKey = keys.shift())) {
    currentValue = currentValue[currentKey];
    if (currentValue == undefined) return;
  }

  if (typeof currentValue !== "boolean") return;

  return currentValue as boolean;
}

export function getPermission(permissions: Permissions, key: PermissionKey) {
  return (
    getPermissionFromGivenData(permissions, key) ||
    getPermissionFromGivenData(defaultPermissions, key)
  );
}

// Taken from Property Access Only Type in https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends any[]
    ? `${TKey}`
    : TObj[TKey] extends object
      ? `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
      : `${TKey}`;
}[keyof TObj & (string | number)];
