/* eslint-disable @typescript-eslint/no-explicit-any */
import CircleQuestionSVG from './icons/circle-question';
import ChartSVG from './icons/chart';
import DeleteSVG from './icons/delete';

export enum IconSize {
  XSMALL = 'xsmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum IconType {
  CIRCLE_QUESTION = 'circle-question',
  CHART = 'chart',
  DELETE = 'delete',
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: IconType;
  size?: IconSize;
}

const iconSizeValues: Record<IconSize, number> = {
  xsmall: 16,
  small: 20,
  medium: 28,
  large: 40,
};

export const icons: Record<
  IconType,
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element
> = {
  'circle-question': (props: any) => (
    <CircleQuestionSVG role="img" {...props} />
  ),
  chart: (props: any) => <ChartSVG role="img" {...props} />,
  delete: (props: any) => <DeleteSVG role="img" {...props} />,
};

function Icon({ type, size = IconSize.MEDIUM, ...restProps }: IconProps) {
  const icon = icons[type];
  const sizeValue = iconSizeValues[size];

  if (icon) {
    return icon({ width: sizeValue, height: sizeValue, ...restProps });
  }
  return null;
}

Icon.displayName = 'Icon';

export default Icon;
