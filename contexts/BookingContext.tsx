"use client"

import { createContext, useContext, useReducer } from "react"
import type { Reservation } from "@/types/reservation"

type ReservationInput = Omit<Reservation, "id" | "status" | "createdAt">

// 予約の各ステップの合計数
export const TOTAL_STEPS = 4

// 予約情報の状態の型
export type BookingState = {
  step: number
  menuId: string | null
  staffId: string | null
  date: string | null
  time: string | null
  notes: string
}

// 予約情報の初期状態
const INITIAL_STATE: BookingState = {
  step: 1,
  menuId: null,
  staffId: null,
  date: null,
  time: null,
  notes: "",
}

// 予約情報の状態を更新するためのアクションの型
export type BookingAction =
  | { type: "select-menu"; menuId: string }
  | { type: "select-staff"; staffId: string | null }
  | { type: "select-date"; date: string }
  | { type: "select-time"; time: string }
  | { type: "change-notes"; notes: string }
  | { type: "next" }
  | { type: "prev" }
  | { type: "reset" }

// 各ステップで必須項目が選ばれているか
export function canGoNext(state: BookingState): boolean {
  switch (state.step) {
    case 1:
      return state.menuId !== null
    case 2:
      return state.date !== null && state.time !== null
    default:
      return true
  }
}

// 予約情報の状態を更新するための reducer
function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "select-menu":
      return { ...state, menuId: action.menuId }
    case "select-staff":
      return { ...state, staffId: action.staffId }
    case "select-date":
      return { ...state, date: action.date }
    case "select-time":
      return { ...state, time: action.time }
    case "change-notes":
      return { ...state, notes: action.notes }
    case "next":
      return { ...state, step: Math.min(state.step + 1, TOTAL_STEPS) }
    case "prev":
      return { ...state, step: Math.max(state.step - 1, 1) }
    case "reset":
      return INITIAL_STATE
  }
}

// 未選択の項目がある場合は null を返す
export function toReservationInput(shopId: string, state: BookingState): ReservationInput | null {
  if (!state.menuId || !state.date || !state.time) return null
  return {
    shopId,
    menuId: state.menuId,
    staffId: state.staffId,
    date: state.date,
    time: state.time,
    notes: state.notes,
  }
}

type BookingContextValue = {
  shopId: string
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
}

// 予約情報のコンテキスト
const BookingContext = createContext<BookingContextValue | null>(null)

// 予約情報のコンテキストプロバイダー
export function BookingProvider({ shopId, children }: { shopId: string; children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, INITIAL_STATE)

  return <BookingContext.Provider value={{ shopId, state, dispatch }}>{children}</BookingContext.Provider>
}

// 予約情報のコンテキストを利用するためのカスタムフック
export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking は BookingProvider の内側で使ってください")
  }
  return context
}