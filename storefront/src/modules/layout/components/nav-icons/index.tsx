import * as React from "react"

type IconProps = React.ComponentPropsWithoutRef<"svg">

export const BagIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M18.5 8.875h-13v10h13v-10ZM4 7.375v13h16v-13H4Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.75 8.376 9 8.375h-.75v-.021a3.367 3.367 0 0 1 .007-.191c.007-.124.02-.298.046-.506.051-.411.155-.973.37-1.545.213-.57.551-1.19 1.094-1.673.559-.496 1.299-.814 2.233-.814.934 0 1.674.318 2.233.814.543.483.88 1.103 1.094 1.673.215.572.319 1.134.37 1.545a7.23 7.23 0 0 1 .052.654v.043l.001.014v.006l-.75.001h-.75V8.35l-.005-.106a5.717 5.717 0 0 0-.036-.4 5.413 5.413 0 0 0-.286-1.205c-.162-.43-.386-.81-.687-1.077-.285-.254-.67-.436-1.236-.436s-.951.182-1.236.436c-.3.267-.525.647-.687 1.077-.16.428-.244.866-.286 1.205a5.728 5.728 0 0 0-.04.506l-.001.024v.003Z"
      clipRule="evenodd"
    />
  </svg>
)

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 4.125a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5Zm-5.75 4.25a5.75 5.75 0 1 1 11.5 0 5.75 5.75 0 0 1-11.5 0Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.813 15.188a8.75 8.75 0 0 1 14.937 6.187h-1.5a7.25 7.25 0 1 0-14.5 0h-1.5a8.75 8.75 0 0 1 2.563-6.187Z"
      clipRule="evenodd"
    />
  </svg>
)

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.75 4.75a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-7.5 6a7.5 7.5 0 1 1 13.36 4.68l3.83 3.83-1.06 1.06-3.83-3.83A7.5 7.5 0 0 1 3.25 10.75Z"
      clipRule="evenodd"
    />
  </svg>
)

export const MenuIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path fill="currentColor" d="M3 6.25h18v1.5H3v-1.5ZM3 11.25h18v1.5H3v-1.5ZM3 16.25h18v1.5H3v-1.5Z" />
  </svg>
)
