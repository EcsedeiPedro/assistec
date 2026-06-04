import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  titleAction?: ReactNode;
  actions?: ReactNode;
};

export function PageContainer({
  children,
  className,
  title,
  description,
  titleAction,
  actions,
}: Props) {
  const classes = className ? `space-y-8 ${className}` : "space-y-8";

  const hasHeader = Boolean(title || description || titleAction || actions);

  return (
    <section className={classes}>
      {hasHeader && (
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            {(title || titleAction) && (
              <div className="flex items-center gap-4">
                {title && <h1 className="text-3xl font-bold text-green-dark">{title}</h1>}
                {titleAction}
              </div>
            )}

            {description && <p className="text-gray-dark">{description}</p>}
          </div>

          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}

      {children}
    </section>
  );
}
