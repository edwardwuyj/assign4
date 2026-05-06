import { DetailItem, LinkGroup, Modal } from '@/components';
import { PERSON_ENDPOINT, type PersonResponse, getImageUrl } from '@/core';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

// PersonView go to actor/crew details inside a modal and render nested views for career and images
export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 bg-gray-950 p-5">
          <img className="w-50 rounded-xl object-cover" src={getImageUrl(data.profile_path)} alt={data.name} />
          <div className="space-y-4 overflow-y-auto">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="leading-relaxed text-gray-300">{data.biography}</p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem label="Department" value={data.known_for_department} />
              <DetailItem label="Born" value={data.birthday} />
              {data.deathday && <DetailItem label="Died" value={data.deathday} />}
              <DetailItem label="Born In" value={data.place_of_birth} />
            </div>
            <LinkGroup
              options={[
                { label: 'Career', to: 'career' },
                { label: 'Images', to: 'images' },
              ]}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </Modal>
  );
};
