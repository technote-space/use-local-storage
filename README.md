# useLocalStorage

[![npm version](https://badge.fury.io/js/%40technote-space%2Fuse-local-storage.svg)](https://badge.fury.io/js/%40technote-space%2Fuse-local-storage)
[![CI Status](https://github.com/technote-space/use-local-storage/workflows/CI/badge.svg)](https://github.com/technote-space/use-local-storage/actions)
[![codecov](https://codecov.io/gh/technote-space/use-local-storage/branch/master/graph/badge.svg)](https://codecov.io/gh/technote-space/use-local-storage)
[![CodeFactor](https://www.codefactor.io/repository/github/technote-space/use-local-storage/badge)](https://www.codefactor.io/repository/github/technote-space/use-local-storage)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/technote-space/use-local-storage/blob/master/LICENSE)

React hook to handle localStorage.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [Usage](#usage)
  - [Install](#install)
  - [Use](#use)
- [Author](#author)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

### Install

`yarn add @technote-space/use-local-storage`

or

`npm i @technote-space/use-local-storage`

### Use

e.g.

```ts
import {useCallback} from 'react';
import useLocalStorage from '@technote-space/use-local-storage';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export type ThemeColor = 'light' | 'dark';
const useDarkMode = (): [ThemeColor, () => void, (isDarkMode: boolean) => void] => {
  const [isDarkMode, setDarkMode] = useLocalStorage('is-dark-mode', useMediaQuery('(prefers-color-scheme: dark)'));
  const toggleDarkMode            = useCallback(() => {
    setDarkMode(isDarkMode => !isDarkMode);
  }, []);
  return [isDarkMode ? 'dark' : 'light', toggleDarkMode, setDarkMode];
};

export default useDarkMode;
```

## Author

[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
