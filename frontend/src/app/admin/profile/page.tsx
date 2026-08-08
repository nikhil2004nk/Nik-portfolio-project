'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { profileService } from '../../../features/profile/services/profile.service';
import { Profile } from '../../../types/profile';
import { TextField } from '../../../components/forms/TextField';
import { TextAreaField } from '../../../components/forms/TextAreaField';
import { Button } from '../../../components/ui/Button';

export default function ProfileAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm<Partial<Profile>>();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.getProfile();
        if (data) {
          reset(data);
        }
      } catch (error) {
        console.error('Failed to load profile', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [reset]);

  const onSubmit = async (data: Partial<Profile>) => {
    try {
      setSaveSuccess(false);
      setSaveError(null);
      
      // Explicitly extract only the fields managed by this form to prevent strict ValidationPipe errors
      const submitData = {
        name: data.name,
        headline: data.headline,
        bio: data.bio,
        currentCompany: data.currentCompany,
        currentRole: data.currentRole,
        email: data.email,
        location: data.location,
        freelanceAvailable: !!data.freelanceAvailable,
        remoteAvailable: !!data.remoteAvailable,
      };

      await profileService.updateProfile(submitData);
      // Reset the form with the newly saved data so that isDirty becomes false again
      reset(submitData);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e: any) {
      console.error(e);
      setSaveError(e.message || 'Failed to save profile. Please check your inputs.');
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading profile data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-8">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-panel border border-hairline p-8 rounded-lg space-y-6">
        
        <div className="grid md:grid-cols-2 gap-6">
          <TextField
            label="Name"
            registration={register('name')}
            placeholder="John Doe"
          />
          <TextField
            label="Headline"
            registration={register('headline')}
            placeholder="Full Stack Developer"
          />
        </div>

        <TextAreaField
          label="Bio"
          registration={register('bio')}
          placeholder="I build things for the web."
        />

        <div className="grid md:grid-cols-2 gap-6">
          <TextField
            label="Current Company"
            registration={register('currentCompany')}
          />
          <TextField
            label="Current Role"
            registration={register('currentRole')}
          />
          <TextField
            label="Email"
            registration={register('email')}
          />
          <TextField
            label="Location"
            registration={register('location')}
          />
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-hairline">
          <label className="flex items-center gap-2 text-sm font-mono text-muted cursor-pointer">
            <input type="checkbox" {...register('freelanceAvailable')} className="form-checkbox bg-ink border-hairline text-signal rounded" />
            Freelance Available
          </label>
          <label className="flex items-center gap-2 text-sm font-mono text-muted cursor-pointer">
            <input type="checkbox" {...register('remoteAvailable')} className="form-checkbox bg-ink border-hairline text-signal rounded" />
            Remote Available
          </label>
        </div>

        <div className="pt-6 flex items-center justify-between">
          <div>
            {saveSuccess && <span className="text-signal font-mono text-sm">Profile saved successfully!</span>}
            {saveError && <span className="text-alert font-mono text-sm">{saveError}</span>}
          </div>
          <Button type="submit" variant="primary" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
}
