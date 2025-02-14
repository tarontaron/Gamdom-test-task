export type TCreateEventPayload = {
  name: string;
  odds: number;
}

export type TUpdateEventPayload = {
  name?: string;
  odds?: number;
}
