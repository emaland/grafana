import React, { FC, HTMLProps } from 'react';
import { css } from 'emotion';
import { selectThemeVariant, stylesFactory, useTheme } from '../../themes';
import { GrafanaTheme } from '../../types';
import { Label } from './Label';
import { InputStyles } from './types';
import { FieldValidationMessage } from './FieldValidationMessage';

interface Props extends HTMLProps<HTMLInputElement> {
  label?: string;
  description?: string;
  invalid?: boolean;
  invalidMessage?: string;
}

const getInputStyle = stylesFactory(
  (theme: GrafanaTheme): InputStyles => {
    const colors = theme.colors;

    return {
      input: css`
        background-color: ${selectThemeVariant({ light: colors.white, dark: colors.gray15 }, theme.type)};
        border: ${theme.border.width.sm} solid
          ${selectThemeVariant({ light: colors.gray4, dark: colors.gray25 }, theme.type)};
        border-radius: ${theme.border.radius.sm};
        height: ${theme.spacing.formInputHeight};
        padding: 0 ${theme.spacing.formInputPaddingHorizontal};
        margin-bottom: ${theme.spacing.formSpacingBase * 2}px;

        line-height: ${theme.typography.lineHeight.lg};
        font-size: ${theme.typography.size.md};
        color: ${selectThemeVariant({ light: colors.gray25, dark: colors.gray85 }, theme.type)};

        &:hover {
          border-color: ${selectThemeVariant({ light: colors.gray70, dark: colors.gray33 }, theme.type)};
        }

        &[disabled],
        &:disabled {
          background-color: ${selectThemeVariant({ light: colors.gray6, dark: colors.gray10 }, theme.type)};
        }
      `,
    };
  }
);

export const Input: FC<Props> = props => {
  const { description, invalid, invalidMessage, label } = props;

  const theme = useTheme();
  const styles = getInputStyle(theme);

  return (
    <div>
      {!!label && <Label description={description}>{label}</Label>}
      <input className={styles.input} {...props} />
      {invalid && invalidMessage && <FieldValidationMessage>{invalidMessage}</FieldValidationMessage>}
    </div>
  );
};
