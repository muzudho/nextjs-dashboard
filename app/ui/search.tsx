'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    console.log(`[handleSearch] ${term}`);

    // ＵＲＬの引数を扱うオブジェクト
    const params = new URLSearchParams(searchParams);

    // 検索欄に入力されている文字列を、ＵＲＬの引数に追加する
    if (term) {
      params.set('query', term);
    // 検索欄に入力されている文字列がなければ、ＵＲＬの引数から削除する
    } else {
      params.delete('query');
    }

    // replace(...) 関数はURLを置き換える。ユーザーが Lee と入力すると、例えば以下のコードの場合 `/dashboard/invoices?query=lee` といった感じになる
    // `${pathname}` は現在のパス。この場合 "/dashboard/invoices"
    // `params.toString()` は、URLの引数に使える書式になるのか？
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
